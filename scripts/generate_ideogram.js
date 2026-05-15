require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const prompt = process.argv[2];
const outputFile = process.argv[3];

if (!prompt || !outputFile) {
    console.error('❌ Usage: node scripts/generate_ideogram.js "<prompt>" <output.png>');
    console.error('   Example: node scripts/generate_ideogram.js "futuristic neon city skyline" bg_1.png');
    process.exit(1);
}

const API_KEY = process.env.IDEOGRAM_API_KEY;
if (!API_KEY) {
    console.error('❌ Agent Error: IDEOGRAM_API_KEY not found in .env');
    process.exit(1);
}

const outputPath = resolveAssetPath(outputFile);
const relativeOutput = getRelativeAssetPath(outputFile);

async function generateIdeogram() {
    console.log(`[AssetFlow] Generating Ideogram image...`);
    console.log(`[AssetFlow] Prompt: "${prompt}"`);

    try {
        const res = await axios.post(
            'https://api.ideogram.ai/v1/images/generate',
            {
                prompt: prompt,
                aspect_ratio: '16:9',
                model: 'V_2_TURBO',
                magic_prompt_option: 'AUTO'
            },
            {
                headers: {
                    'Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        const imageUrl = res.data?.data?.[0]?.url;
        if (!imageUrl) {
            console.error('❌ Agent Error: No image URL returned from Ideogram.');
            console.error(JSON.stringify(res.data, null, 2));
            process.exit(1);
        }

        console.log(`[AssetFlow] Downloading image...`);
        const imageRes = await axios.get(imageUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(outputPath);
        imageRes.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`\n✅ SUCCESS: Image saved.`);
        console.log(`AGENT INSTRUCTION: Use <img src="${relativeOutput}" />`);

    } catch (err) {
        console.error(`❌ Agent Error: ${err.response?.data?.message || err.message}`);
        process.exit(1);
    }
}

generateIdeogram();
