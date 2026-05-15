const { execFile } = require('child_process');
const fs = require('fs');
const { resolveAssetPath, getRelativeAssetPath } = require('../lib/hyperframes');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.error('❌ Usage: node scripts/normalize_video.js <input.mp4> <output.mp4>');
    process.exit(1);
}

const inputPath = resolveAssetPath(inputFile);
const outputPath = resolveAssetPath(outputFile);
const relativeOutput = getRelativeAssetPath(outputFile);

if (!fs.existsSync(inputPath)) {
    console.error(`❌ Agent Error: Input file not found: ${inputPath}`);
    process.exit(1);
}

console.log(`[AssetFlow] Normalizing video: ${inputFile} -> ${outputFile}`);
console.log(`[AssetFlow] Target: 1920x1080, 60fps, H.264`);
console.log(`[AssetFlow] Running FFmpeg...`);

execFile('ffmpeg', [
  '-y', '-i', inputPath,
  '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2',
  '-r', '60', '-c:v', 'libx264', '-preset', 'fast', '-crf', '23',
  '-pix_fmt', 'yuv420p', '-c:a', 'aac', outputPath
], (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Agent Error: Failed to normalize video. ${error.message}`);
        process.exit(1);
    }

    console.log(`\n✅ SUCCESS: Video normalized.`);
    console.log(`AGENT INSTRUCTION: Use <video src="${relativeOutput}"></video>`);
});
