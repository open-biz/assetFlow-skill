const fs = require('fs');
const path = require('path');
const { getHyperframesConfig } = require('../lib/hyperframes');

const { assetDirAbs } = getHyperframesConfig();

console.log(`[AssetFlow] Scanning asset directory: ${assetDirAbs}`);

try {
    const files = fs.readdirSync(assetDirAbs);
    const assets = files
        .filter(f => !f.startsWith('.')) // ignore hidden files
        .map(f => {
            try {
                const stat = fs.statSync(path.join(assetDirAbs, f));
                return {
                    name: f,
                    type: path.extname(f).toLowerCase(),
                    size: stat.size,
                    isDirectory: stat.isDirectory()
                };
            } catch (e) {
                return null;
            }
        })
        .filter(Boolean);

    console.log(`\n✅ SUCCESS: Found ${assets.length} asset(s).`);
    console.log('\nAGENT INSTRUCTION: Here are your available assets:');
    console.log(JSON.stringify(assets, null, 2));
} catch (err) {
    console.error(`❌ Agent Error: Could not read asset directory. ${err.message}`);
    process.exit(1);
}
