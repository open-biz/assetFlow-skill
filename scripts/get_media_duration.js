const { execFile } = require('child_process');
const fs = require('fs');
const { resolveAssetPath } = require('../lib/hyperframes');

const inputFile = process.argv[2];

if (!inputFile) {
    console.error('❌ Usage: node scripts/get_media_duration.js <filename.mp4>');
    process.exit(1);
}

const inputPath = resolveAssetPath(inputFile);

if (!fs.existsSync(inputPath)) {
    console.error(`❌ Agent Error: File not found: ${inputPath}`);
    process.exit(1);
}

console.log(`[AssetFlow] Probing duration for: ${inputFile}`);

execFile('ffprobe', [
  '-v', 'error', '-show_entries', 'format=duration',
  '-of', 'default=noprint_wrappers=1:nokey=1', inputPath
], (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Agent Error: Failed to get duration. ${error.message}`);
        process.exit(1);
    }

    const duration = parseFloat(stdout.trim());
    if (isNaN(duration)) {
        console.error(`❌ Agent Error: Could not parse duration.`);
        process.exit(1);
    }

    console.log(`\n✅ SUCCESS: Duration = ${duration} seconds`);
    console.log(`AGENT INSTRUCTION: Use duration="${duration}" in your timeline calculations.`);
});
