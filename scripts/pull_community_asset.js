require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const assetId = process.argv[2];

if (!assetId) {
    console.error('❌ Usage: node scripts/pull_community_asset.js <asset_id>');
    console.error('   Example: node scripts/pull_community_asset.js @community/ideogram-neon-city');
    process.exit(1);
}

const REGISTRY_URL = process.env.ASSETFLOW_REGISTRY_URL || 'https://assetflow.community/api/v1';
const API_KEY = process.env.ASSETFLOW_API_KEY;

async function pullCommunityAsset() {
    console.log(`[AssetFlow] Pulling community asset: ${assetId}`);

    try {
        // Resolve asset from community registry
        const headers = { 'Content-Type': 'application/json' };
        if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

        const metaRes = await axios.get(
            `${REGISTRY_URL}/assets/${encodeURIComponent(assetId)}`,
            { headers }
        );

        const { download_url, filename, type } = metaRes.data;
        if (!download_url || !filename) {
            console.error('❌ Agent Error: Asset metadata incomplete from registry.');
            process.exit(1);
        }

        const outputFile = path.basename(filename);
        const outputPath = resolveAssetPath(outputFile);
        const relativeOutput = getRelativeAssetPath(outputFile);

        console.log(`[AssetFlow] Downloading ${filename} (${type || 'unknown type'})...`);
        const downloadRes = await axios.get(download_url, { responseType: 'stream' });
        const writer = fs.createWriteStream(outputPath);
        downloadRes.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`\n✅ SUCCESS: Community asset downloaded.`);
        console.log(`AGENT INSTRUCTION: Use <${type?.startsWith('video') ? 'video' : type?.startsWith('audio') ? 'audio' : 'img'} src="${relativeOutput}"></${type?.startsWith('video') ? 'video' : type?.startsWith('audio') ? 'audio' : 'img'}>`);

    } catch (err) {
        // Fallback: if registry unavailable, simulate local resolution
        console.log(`[AssetFlow] Registry unavailable or asset not found. Attempting local resolution...`);
        const localPath = resolveAssetPath(assetId.replace('@community/', ''));
        if (fs.existsSync(localPath)) {
            const relativeOutput = getRelativeAssetPath(assetId.replace('@community/', ''));
            console.log(`\n✅ SUCCESS: Asset already exists locally.`);
            console.log(`AGENT INSTRUCTION: Use src="${relativeOutput}"`);
        } else {
            console.error(`❌ Agent Error: Could not resolve community asset. ${err.message}`);
            process.exit(1);
        }
    }
}

pullCommunityAsset();
