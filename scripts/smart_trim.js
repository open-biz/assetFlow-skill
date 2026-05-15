const { execFile } = require('child_process');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const inputFile = process.argv[2];
const startTime = process.argv[3]; // e.g., "00:00:15" or "15"
const duration = process.argv[4];  // e.g., "10" (seconds)
const outputFile = process.argv[5];

if (!inputFile || !startTime || !duration || !outputFile) {
    console.error('❌ Usage: node scripts/smart_trim.js <input.mp4> <start_time> <duration> <output.mp4>');
    console.error('   Example: node scripts/smart_trim.js raw.mp4 00:00:15 10 trimmed.mp4');
    process.exit(1);
}

const inputPath = resolveAssetPath(inputFile);
const outputPath = resolveAssetPath(outputFile);
const relativeOutput = getRelativeAssetPath(outputFile);

// Check if input exists
const fs = require('fs');
if (!fs.existsSync(inputPath)) {
    console.error(`❌ Agent Error: Input file not found: ${inputPath}`);
    process.exit(1);
}

console.log(`[AssetFlow] Agent requested trim: ${inputFile} from ${startTime} for ${duration}s`);
console.log(`[AssetFlow] Running FFmpeg...`);

execFile('ffmpeg', ['-y', '-i', inputPath, '-ss', startTime, '-t', duration, '-c', 'copy', outputPath], (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Agent Error: Failed to trim video. ${error.message}`);
        process.exit(1);
    }

    console.log(`\n✅ SUCCESS: Video trimmed and saved.`);
    console.log(`AGENT INSTRUCTION: Use <video src="${relativeOutput}"></video>`);
});
