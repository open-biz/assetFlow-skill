#!/usr/bin/env bash
set -e

REPO_URL="https://github.com/open-biz/assetFlow-skill.git"
DEFAULT_DIR="assetflow-skill"
TARGET_DIR="${1:-$DEFAULT_DIR}"

echo "🌊 AssetFlow Installer"
echo "======================"

# 1. Clone
if [ -d "$TARGET_DIR" ]; then
    echo "⚠️  Directory '$TARGET_DIR' already exists. Aborting."
    exit 1
fi

echo "📥 Cloning AssetFlow into ./$TARGET_DIR ..."
git clone --depth 1 "$REPO_URL" "$TARGET_DIR"
cd "$TARGET_DIR"

# 2. Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

# 3. Set up .env if missing
if [ ! -f ".env" ]; then
    echo "🔑 Creating .env from template..."
    cp .env.example .env
    echo "   → Edit .env and add your API keys (HEYGEN_API_KEY, etc.)"
fi

# 4. Check prerequisites
echo "🔍 Checking prerequisites..."

FFMPEG_OK=0
FFPROBE_OK=0

if command -v ffmpeg &> /dev/null; then
    echo "   ✅ FFmpeg found: $(ffmpeg -version | head -n 1)"
    FFMPEG_OK=1
else
    echo "   ❌ FFmpeg NOT found. Install it: https://ffmpeg.org/download.html"
fi

if command -v ffprobe &> /dev/null; then
    echo "   ✅ FFprobe found"
    FFPROBE_OK=1
else
    echo "   ❌ FFprobe NOT found (usually ships with FFmpeg)"
fi

if [ "$FFMPEG_OK" -eq 0 ] || [ "$FFPROBE_OK" -eq 0 ]; then
    echo ""
    echo "⚠️  FFmpeg is required for AssetFlow to process video."
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu: sudo apt install ffmpeg"
    echo "   Windows: https://ffmpeg.org/download.html#build-windows"
fi

# 5. Done
echo ""
echo "✅ AssetFlow is ready in ./$TARGET_DIR"
echo ""
echo "Next steps:"
echo "   cd $TARGET_DIR"
echo "   # Edit .env with your API keys"
echo "   node scripts/list_local_assets.js"
echo "   node scripts/generate_avatar.js \"Hello world!\" intro.mp4"
echo ""
