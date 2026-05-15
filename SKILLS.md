# 🌊 AssetFlow — Agent Skill Manifest

> **CRITICAL RULE:** Before writing any Hyperframes HTML compositions, you MUST use these scripts to prepare the assets. Do not hallucinate file paths. Wait for the script to return the valid relative path, and use that exact path in your `<video>` or `<audio>` tags.

## Prerequisites
- Node.js installed
- FFmpeg & FFprobe installed on your machine
- API keys configured in `.env`

---

## 📁 Capabilities

### 1. Generate Avatar (HeyGen)
Create an AI presenter clip via HeyGen v2 API.
```bash
node scripts/generate_avatar.js "<script_text>" <output_filename.mp4>
```
**Example:**
```bash
node scripts/generate_avatar.js "Welcome to AssetFlow!" intro.mp4
```

### 2. Generate Voiceover (HeyGen TTS)
Create an AI text-to-speech audio track.
```bash
node scripts/generate_voiceover.js "<script_text>" <output_filename.mp3>
```
**Example:**
```bash
node scripts/generate_voiceover.js "AssetFlow is the future of AI video." vo_1.mp3
```

### 3. Generate ElevenLabs Voiceover (Premium TTS)
High-fidelity voice generation via ElevenLabs.
```bash
node scripts/generate_elevenlabs.js "<text>" <voice_id> <output.mp3>
```
**Example:**
```bash
node scripts/generate_elevenlabs.js "Welcome to the future" 21m00Tcm4TlvDq8ikWAM premium_vo.mp3
```

### 4. Generate Image Background (Ideogram)
Create 16:9 AI-generated image backgrounds.
```bash
node scripts/generate_ideogram.js "<prompt>" <output_filename.png>
```
**Example:**
```bash
node scripts/generate_ideogram.js "futuristic neon city skyline at night" bg_1.png
```

### 5. Generate Video B-Roll (Google Veo)
Create AI-generated cinematic video clips via Google Vertex AI / Veo.
```bash
node scripts/generate_video_google.js "<prompt>" <output_filename.mp4>
```
**Example:**
```bash
node scripts/generate_video_google.js "cinematic drone shot gliding over a neon city at night" broll_city.mp4
```
**Prerequisites:** Google Cloud project with Vertex AI enabled. Run `gcloud auth application-default login` or set `GOOGLE_ACCESS_TOKEN`.

### 6. Pull Community Asset
Download pre-made assets from the AssetFlow community registry.
```bash
node scripts/pull_community_asset.js <asset_id>
```
**Example:**
```bash
node scripts/pull_community_asset.js @community/ideogram-neon-city
```

### 7. Normalize Video
Format raw screen recordings to Hyperframes-safe specs (1080p, 60fps, H.264).
```bash
node scripts/normalize_video.js <input.mp4> <output.mp4>
```
**Example:**
```bash
node scripts/normalize_video.js raw_recording.mp4 intro_normalized.mp4
```

### 8. Smart Trim Video
Slice a specific segment from a longer video without re-encoding.
```bash
node scripts/smart_trim.js <input.mp4> <start_time> <duration> <output.mp4>
```
**Example:**
```bash
node scripts/smart_trim.js long_recording.mp4 00:00:45 10 feature_demo.mp4
```

### 9. Get Media Duration
Returns exact media length in seconds for timeline math.
```bash
node scripts/get_media_duration.js <filename>
```
**Example:**
```bash
node scripts/get_media_duration.js intro.mp4
```
**Agent Use:** Use the returned float to calculate `data-start` and `data-duration` for Hyperframes timeline math.

### 10. List Local Assets
Scans the Hyperframes asset folder to see what is already downloaded.
```bash
node scripts/list_local_assets.js
```
**Agent Use:** Always run this before generating new assets to avoid duplicates.

---

## 🎯 Agent Routing Logic

When a user asks for media, route to the correct provider:

| Request Type | Use Script |
|---|---|
| AI Presenter / Avatar | `generate_avatar.js` (HeyGen) |
| Basic TTS Voiceover | `generate_voiceover.js` (HeyGen) |
| Premium / Emotional TTS | `generate_elevenlabs.js` (ElevenLabs) |
| Photo-realistic Background | `generate_ideogram.js` (Ideogram) |
| Cinematic B-roll / Video | `generate_video_google.js` (Google Veo) or community assets |
| Screen Recording Cleanup | `normalize_video.js` |
| Hero Moment Extraction | `smart_trim.js` |
| Timeline Calculation | `get_media_duration.js` |

---

## 🧠 Workflow Example

**User:** "Make a Hyperframes composition with an intro, a 10-second feature demo, and an outro."

**Agent Steps:**
1. `node scripts/list_local_assets.js` — Check what exists.
2. `node scripts/generate_avatar.js "Welcome to AssetFlow" intro.mp4` — Generate intro.
3. `node scripts/get_media_duration.js intro.mp4` — Confirm intro is 5.2s.
4. `node scripts/smart_trim.js raw_demo.mp4 00:00:45 10 feature_demo.mp4` — Extract demo.
5. `node scripts/normalize_video.js feature_demo.mp4 feature_demo_norm.mp4` — Normalize it.
6. `node scripts/get_media_duration.js feature_demo_norm.mp4` — Confirm demo is 10s.
7. `node scripts/generate_avatar.js "Thanks for watching!" outro.mp4` — Generate outro.
8. `node scripts/get_media_duration.js outro.mp4` — Confirm outro is 4.1s.
9. **Write HTML:** Timeline starts at 0, intro ends at 5.2s, demo starts at 5.2s and lasts 10s, outro starts at 15.2s.

---

## 📂 Path Resolution

All scripts automatically:
1. Read `hyperframes.json` from the current working directory.
2. Resolve `paths.assets` (default: `./assets`).
3. Save outputs there and return relative paths for your HTML.

**Never hardcode paths. Always use the script output.**
