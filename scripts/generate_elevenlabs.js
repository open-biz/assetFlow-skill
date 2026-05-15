require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const scriptText = process.argv[2];
const voiceId = process.argv[3];
const outputFile = process.argv[4];

if (!scriptText || !outputFile) {
    console.error('❌ Usage: node scripts/generate_elevenlabs.js "<text>" <voice_id> <output.mp3>');
    console.error('   Example: node scripts/generate_elevenlabs.js "Hello world" 21m00Tcm4TlvDq8ikWAM vo_1.mp3');
    process.exit(1);
}

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
    console.error('❌ Agent Error: ELEVENLABS_API_KEY not found in .env');
    process.exit(1);
}

const resolvedVoiceId = voiceId || process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
const outputPath = resolveAssetPath(outputFile);
const relativeOutput = getRelativeAssetPath(outputFile);

async function generateElevenLabs() {
    console.log(`[AssetFlow] Generating ElevenLabs TTS voiceover...`);
    console.log(`[AssetFlow] Voice ID: ${resolvedVoiceId}`);

    try {
        const res = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${resolvedVoiceId}`,
            {
                text: scriptText,
                model_id: 'eleven_turbo_v2_5',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.0,
                    use_speaker_boost: true
                }
            },
            {
                headers: {
                    'xi-api-key': API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'audio/mpeg'
                },
                responseType: 'stream'
            }
        );

        const writer = fs.createWriteStream(outputPath);
        res.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`\n✅ SUCCESS: ElevenLabs voiceover saved.`);
        console.log(`AGENT INSTRUCTION: Use <audio src="${relativeOutput}"></audio>`);

    } catch (err) {
        console.error(`❌ Agent Error: ${err.response?.data?.detail?.message || err.message}`);
        process.exit(1);
    }
}

generateElevenLabs();
