# 🌊 AssetFlow

> **Autonomous Asset Orchestrator for HeyGen Hyperframes**

AssetFlow is an autonomous pipeline that syncs your unedited clips from the cloud, intelligently trims them using AI, and injects them directly into the Hyperframes Studio. We’ve turned the biggest blocker in the developer experience into a one-click automated workflow.

---

## 🚀 Problem

Building programmatic video with AI agents fails because agents hallucinate video paths, struggle with timeline math, and crash the renderer with improperly formatted screen recordings (variable framerates/resolutions). Developers waste hours manually chopping videos, generating HeyGen clips, and tracking relative paths.

## ✅ Solution

AssetFlow gives AI agents (like Cursor, Claude Code, Claude Design or OpenDesign) the native ability to generate, fetch, trim, normalize, and measure media files autonomously.

---

## 🛠️ Tech Stack

- **Environment:** Node.js (Vanilla, no complex frameworks)
- **Video Engine:** FFmpeg & FFprobe (executed via Node `child_process`)
- **External APIs:** HeyGen v2/v3 APIs, ElevenLabs, Ideogram
- **Agent Standard:** Built using the `SKILLS.md` standard
- **Showcase UI:** Next.js + Tailwind CSS (Agent-First Community Gallery)

---

## 📦 One-Liner Install

```bash
curl -sSL https://raw.githubusercontent.com/open-biz/assetFlow-skill/main/install.sh | bash
```

Or install into a custom directory:
```bash
curl -sSL https://raw.githubusercontent.com/open-biz/assetFlow-skill/main/install.sh | bash -s -- my-project
```

**What it does:** clones the repo, installs dependencies, copies `.env.example` → `.env`, and checks for FFmpeg.

**Prerequisites:**
- [Node.js](https://nodejs.org/) installed
- [FFmpeg](https://ffmpeg.org/download.html) installed (`ffmpeg` and `ffprobe` must be in your PATH)

### Manual Install (if you prefer)

```bash
git clone https://github.com/open-biz/assetFlow-skill.git
cd assetflow-skill
npm install
cp .env.example .env
# Then edit .env with your actual API keys
```

---

## 🎬 Quick Start

```bash
# 1. Check what assets you have
node scripts/list_local_assets.js

# 2. Generate an AI avatar clip
node scripts/generate_avatar.js "Hello, welcome to AssetFlow!" intro.mp4

# 3. Get the exact duration for timeline math
node scripts/get_media_duration.js intro.mp4

# 4. Trim a raw recording to a 10-second hero moment
node scripts/smart_trim.js raw_demo.mp4 00:00:45 10 feature.mp4

# 5. Normalize the clip to 1080p60 for Hyperframes
node scripts/normalize_video.js feature.mp4 feature_final.mp4
```

---

## 🧠 How It Works (Agent-First Architecture)

1. **AI Agent reads `SKILLS.md`** to learn what CLI scripts it can run.
2. **Agent runs scripts** to generate, trim, normalize, and measure media.
3. **Scripts read `hyperframes.json`** to resolve the correct asset directory.
4. **Scripts return relative paths** that the Agent uses in Hyperframes HTML.

---

## 📁 Directory Structure

```text
assetflow-skill/
├── package.json               # Dependencies: axios, dotenv
├── .env                       # API Keys
├── .env.example               # Template for env vars
├── SKILLS.md                  # The brain/manifest for the AI Agent
├── README.md                  # You are here
├── lib/
│   └── hyperframes.js         # Helper to parse hyperframes.json and resolve paths
└── scripts/
    ├── generate_avatar.js     # HeyGen AI presenter
    ├── generate_voiceover.js  # HeyGen TTS
    ├── generate_elevenlabs.js # ElevenLabs premium TTS
    ├── generate_ideogram.js  # AI image backgrounds
    ├── pull_community_asset.js # Community asset registry
    ├── normalize_video.js     # FFmpeg: 1080p60 H.264
    ├── smart_trim.js          # FFmpeg: slice segments
    ├── get_media_duration.js  # FFprobe: exact duration
    └── list_local_assets.js   # Scan asset folder
```

---

## 🌐 Community Showcase UI

Inside `assetflow-ui/`, a Next.js app provides a visual gallery of community assets. **Important:** The UI does NOT manage local files directly — it generates Agent-readable prompts that you paste into Claude Code.

```bash
cd assetflow-ui
npm install
npm run dev
```

---

## 🔑 API Keys Needed

| Service | Key Name | Purpose |
|---|---|---|
| HeyGen | `HEYGEN_API_KEY` | Avatar video & TTS |
| ElevenLabs | `ELEVENLABS_API_KEY` | Premium voiceover |
| Ideogram | `IDEOGRAM_API_KEY` | AI image backgrounds |

---

## 🏆 Hackathon Submission

Built for the [HeyGen Hackathon](https://luma.com/wtd2hyst) in the **Product Track**.

**Why this wins the Product Track:**
- AssetFlow isn't just an API wrapper. It's a complete sensory system for AI Agents.
- It solves a massive bottleneck in the Hyperframes developer experience.
- It can stand on its own as a product that any AI-first video developer could use or pay for.

---

## 📜 License

MIT
