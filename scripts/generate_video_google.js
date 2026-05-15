require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { execFile } = require('child_process');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const prompt = process.argv[2];
const outputFile = process.argv[3];

if (!prompt || !outputFile) {
    console.error('❌ Usage: node scripts/generate_video_google.js "<prompt>" <output_filename.mp4>');
    console.error('   Example: node scripts/generate_video_google.js "cinematic drone shot of a neon city" broll_1.mp4');
    process.exit(1);
}

const PROJECT_ID = process.env.GOOGLE_PROJECT_ID;
const LOCATION = process.env.GOOGLE_LOCATION || 'us-central1';
const ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;

if (!PROJECT_ID) {
    console.error('❌ Agent Error: GOOGLE_PROJECT_ID not found in .env');
    console.error('   Google Veo requires a Google Cloud project with Vertex AI enabled.');
    process.exit(1);
}

const outputPath = resolveAssetPath(outputFile);
const relativeOutput = getRelativeAssetPath(outputFile);

// --- Authentication helper ---
async function getAccessToken() {
    if (ACCESS_TOKEN) return ACCESS_TOKEN;

    // Attempt to use gcloud CLI to get a fresh token
    return new Promise((resolve, reject) => {
        execFile('gcloud', ['auth', 'print-access-token'], (err, stdout) => {
            if (err) {
                reject(new Error(
                    'No GOOGLE_ACCESS_TOKEN in .env and gcloud CLI not available. ' +
                    'Run: gcloud auth login'
                ));
                return;
            }
            resolve(stdout.trim());
        });
    });
}

// --- Step 1: Submit generation request ---
async function generateVideo() {
    console.log(`[AssetFlow] Generating Google Veo video...`);
    console.log(`[AssetFlow] Prompt: "${prompt}"`);
    console.log(`[AssetFlow] Project: ${PROJECT_ID} | Region: ${LOCATION}`);

    try {
        const token = await getAccessToken();
        const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/veo-001:predict`;

        const createRes = await axios.post(
            endpoint,
            {
                instances: [
                    {
                        prompt: prompt,
                        aspect_ratio: '16:9'
                    }
                ],
                parameters: {
                    sampleCount: 1,
                    durationSeconds: 5
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Vertex AI returns a Long-Running Operation
        const operationName = createRes.data?.name;
        if (!operationName) {
            console.error('❌ Agent Error: No operation name returned from Vertex AI.');
            console.error(JSON.stringify(createRes.data, null, 2));
            process.exit(1);
        }

        console.log(`[AssetFlow] Operation started: ${operationName}`);
        console.log(`[AssetFlow] Polling for completion...`);

        // --- Step 2: Poll the LRO ---
        const videoUri = await pollOperation(operationName, token);

        // --- Step 3: Download the video ---
        if (videoUri.type === 'base64') {
            fs.writeFileSync(outputPath, Buffer.from(videoUri.data, 'base64'));
            console.log(`[AssetFlow] Video saved from base64 response.`);
        } else {
            // Veo outputs to GCS; the URI is typically gs://bucket/object.mp4
            // We need to convert gs:// to a signed URL or use the GCS JSON API
            console.log(`[AssetFlow] Video generated at: ${videoUri.uri}`);
            console.log(`[AssetFlow] Downloading...`);

            // For MVP: if it's a GCS URI, we extract bucket/object and use GCS JSON API
            if (videoUri.uri.startsWith('gs://')) {
                await downloadFromGCS(videoUri.uri, token, outputPath);
            } else {
                // Direct URL (rare but possible in some configurations)
                const videoRes = await axios.get(videoUri.uri, { responseType: 'stream' });
                const writer = fs.createWriteStream(outputPath);
                videoRes.data.pipe(writer);
                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });
            }
        }

        console.log(`\n✅ SUCCESS: Google Veo video saved.`);
        console.log(`AGENT INSTRUCTION: Use <video src="${relativeOutput}"></video>`);

    } catch (err) {
        const msg = err.response?.data?.error?.message || err.message;
        console.error(`❌ Agent Error: ${msg}`);
        if (msg.includes('Permission') || msg.includes('IAM')) {
            console.error('   Hint: Ensure your GCP service account has "Vertex AI User" role.');
        }
        if (msg.includes('not found') || msg.includes('disabled')) {
            console.error('   Hint: Enable the Vertex AI API in your GCP project console.');
        }
        process.exit(1);
    }
}

async function pollOperation(operationName, token) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 120; // ~10 minutes (120 * 5s)
        const interval = setInterval(async () => {
            attempts++;
            if (attempts > maxAttempts) {
                clearInterval(interval);
                reject(new Error('Google Veo polling timed out after 10 minutes.'));
                return;
            }
            try {
                const pollRes = await axios.get(
                    `https://${LOCATION}-aiplatform.googleapis.com/v1/${operationName}`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );

                const done = pollRes.data?.done;
                const error = pollRes.data?.error;

                console.log(`[AssetFlow] Poll #${attempts} — done: ${done}`);

                if (error) {
                    clearInterval(interval);
                    reject(new Error(error.message));
                    return;
                }

                if (done) {
                    clearInterval(interval);
                    // Extract video URI from response
                    const predictions = pollRes.data?.response?.predictions;
                    if (predictions && predictions[0]?.video?.gcsUri) {
                        resolve({ type: 'gcsUri', uri: predictions[0].video.gcsUri });
                    } else if (predictions && predictions[0]?.content) {
                        resolve({ type: 'base64', data: predictions[0].content });
                    } else {
                        reject(new Error('No video URI or content in completed operation.'));
                    }
                    return;
                }
            } catch (err) {
                clearInterval(interval);
                reject(err);
            }
        }, 5000);
    });
}

async function downloadFromGCS(gcsUri, token, destPath) {
    // gs://bucket-name/object-name -> https://storage.googleapis.com/storage/v1/b/bucket-name/o/object-name?alt=media
    const match = gcsUri.match(/^gs:\/\/([^\/]+)\/(.+)$/);
    if (!match) throw new Error(`Invalid GCS URI: ${gcsUri}`);
    const [, bucket, object] = match;
    // Encode each path segment individually so slashes remain as path separators
    const encodedObject = object.split('/').map(encodeURIComponent).join('/');
    const url = `https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodedObject}?alt=media`;

    const res = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'stream'
    });

    const writer = fs.createWriteStream(destPath);
    res.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

generateVideo();
