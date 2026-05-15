require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const scriptText = process.argv[2];
const outputFile = process.argv[3];

if (!scriptText || !outputFile) {
    console.error('❌ Usage: node scripts/generate_voiceover.js "<script_text>" <output_filename.mp3>');
    console.error('   Example: node scripts/generate_voiceover.js "Welcome to AssetFlow" vo_1.mp3');
    process.exit(1);
}

const API_KEY = process.env.HEYGEN_API_KEY;
if (!API_KEY) {
    console.error('❌ Agent Error: HEYGEN_API_KEY not found in .env');
    process.exit(1);
}

const outputPath = resolveAssetPath(outputFile);
const relativeOutput = getRelativeAssetPath(outputFile);

async function generateVoiceover() {
    console.log(`[AssetFlow] Generating HeyGen TTS voiceover...`);
    console.log(`[AssetFlow] Script: "${scriptText}"`);

    try {
        const res = await axios.post(
            'https://api.heygen.com/v1/voice/generate',
            {
                text: scriptText,
                voice_id: process.env.HEYGEN_VOICE_ID || '2d5b0e8cf6944c11b8f7236b7b66a32a',
                speed: 1.0,
                format: 'mp3'
            },
            {
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        const audioUrl = res.data?.data?.audio_url || res.data?.audio_url;
        if (!audioUrl) {
            console.error('❌ Agent Error: No audio_url returned from HeyGen TTS.');
            console.error(JSON.stringify(res.data, null, 2));
            process.exit(1);
        }

        console.log(`[AssetFlow] Downloading audio...`);
        const audioRes = await axios.get(audioUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(outputPath);
        audioRes.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`\n✅ SUCCESS: Voiceover saved.`);
        console.log(`AGENT INSTRUCTION: Use <audio src="${relativeOutput}"></audio>`);

    } catch (err) {
        console.error(`❌ Agent Error: ${err.response?.data?.message || err.message}`);
        process.exit(1);
    }
}

generateVoiceover();
