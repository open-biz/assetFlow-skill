require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const scriptText = process.argv[2];
const outputFile = process.argv[3];

if (!scriptText || !outputFile) {
    console.error('❌ Usage: node scripts/generate_avatar.js "<script_text>" <output_filename.mp4>');
    console.error('   Example: node scripts/generate_avatar.js "Hello world" intro.mp4');
    process.exit(1);
}

const API_KEY = process.env.HEYGEN_API_KEY;
if (!API_KEY) {
    console.error('❌ Agent Error: HEYGEN_API_KEY not found in .env');
    process.exit(1);
}

const outputPath = resolveAssetPath(outputFile);
const relativeOutput = getRelativeAssetPath(outputFile);

// --- Step 1: Create the video ---
async function generateAvatar() {
    console.log(`[AssetFlow] Generating HeyGen Avatar video...`);
    console.log(`[AssetFlow] Script: "${scriptText}"`);

    try {
        const createRes = await axios.post(
            'https://api.heygen.com/v2/video/generate',
            {
                video_inputs: [
                    {
                        character: {
                            type: 'avatar',
                            avatar_id: process.env.HEYGEN_AVATAR_ID || 'Daisy-inskirt-20220818',
                            avatar_style: 'normal'
                        },
                        voice: {
                            type: 'text',
                            input_text: scriptText,
                            voice_id: process.env.HEYGEN_VOICE_ID || '2d5b0e8cf6944c11b8f7236b7b66a32a',
                            speed: 1.0
                        },
                        background: {
                            type: 'color',
                            value: '#f5f5f5'
                        }
                    }
                ],
                dimension: {
                    width: 1920,
                    height: 1080
                }
            },
            {
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        const videoId = createRes.data?.data?.video_id;
        if (!videoId) {
            console.error('❌ Agent Error: No video_id returned from HeyGen.');
            console.error(JSON.stringify(createRes.data, null, 2));
            process.exit(1);
        }

        console.log(`[AssetFlow] Video ID: ${videoId}`);
        console.log(`[AssetFlow] Polling for completion...`);

        // --- Step 2: Poll for status ---
        const videoUrl = await pollStatus(videoId);

        // --- Step 3: Download ---
        console.log(`[AssetFlow] Downloading video...`);
        const videoRes = await axios.get(videoUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(outputPath);
        videoRes.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`\n✅ SUCCESS: Avatar video saved.`);
        console.log(`AGENT INSTRUCTION: Use <video src="${relativeOutput}"></video>`);

    } catch (err) {
        console.error(`❌ Agent Error: ${err.response?.data?.message || err.message}`);
        process.exit(1);
    }
}

async function pollStatus(videoId) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 120; // 10 minutes max (120 * 5s)
        const interval = setInterval(async () => {
            attempts++;
            if (attempts > maxAttempts) {
                clearInterval(interval);
                reject(new Error('HeyGen polling timed out after 10 minutes.'));
                return;
            }
            try {
                const statusRes = await axios.get(
                    `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`,
                    { headers: { 'X-Api-Key': API_KEY } }
                );

                const status = statusRes.data?.data?.status;
                const videoUrl = statusRes.data?.data?.video_url;

                console.log(`[AssetFlow] Status: ${status}`);

                if (status === 'completed') {
                    clearInterval(interval);
                    resolve(videoUrl);
                } else if (status === 'failed') {
                    clearInterval(interval);
                    reject(new Error('HeyGen video generation failed.'));
                }
            } catch (err) {
                clearInterval(interval);
                reject(err);
            }
        }, 5000); // Poll every 5 seconds
    });
}

generateAvatar();
