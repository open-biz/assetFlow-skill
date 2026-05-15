# AssetFlow Launch Demo — Video Script & Storyboard

> **Duration:** 60–90 seconds  
> **Format:** Hyperframes composition (programmatic video)  
> **Target:** HeyGen Hackathon judges & developer community  
> **Tone:** Fast-paced, technical, agent-first

---

## 🎬 Overview

This video demonstrates AssetFlow as the missing link between AI agents and programmatic video. It shows a developer (or AI agent) using AssetFlow CLI commands to generate assets, then seamlessly injecting them into a Hyperframes composition — all without hallucinated paths or broken timelines.

---

## 🏗️ Composition Structure (Hyperframes Blocks)

```text
Timeline:
├── 00:00.000 - 00:05.000  →  HOOK: Cover card + title drop
├── 00:05.000 - 00:12.000  →  PROBLEM: Split-screen chaos (broken paths, wrong durations)
├── 00:12.000 - 00:28.000  →  SOLUTION: Terminal demo (live command execution)
├── 00:28.000 - 00:38.000  →  AGENT WORKFLOW: Full pipeline in action
├── 00:38.000 - 00:48.000  →  HYPERFRAMES INJECTION: HTML composition render
├── 00:48.000 - 00:58.000  →  SHOWCASE UI: Browse, copy, paste
├── 00:58.000 - 01:05.000  →  CTA: Install command + GitHub repo
└── 01:05.000 - 01:08.000  →  END CARD: Logo + tagline
```

---

## 🎨 Visual Assets Needed

| Asset ID | Type | Source | Notes |
|---|---|---|---|
| `cover_card` | SVG/Image | `assetflow_cover.svg` | Full-bleed background, slow zoom |
| `terminal_window` | Screen recording | Terminal capture | Styled with dark theme, cyan accents |
| `avatar_intro` | HeyGen video | `scripts/generate_avatar.js` | "Meet AssetFlow" — 5s |
| `demo_pipeline` | Screen recording | Terminal + browser split | Showing commands + file outputs |
| `hyperframes_render` | Screen recording | Browser | Hyperframes player rendering composition |
| `ui_gallery` | Screen recording | `assetflow-ui` | Dark-themed gallery with copy buttons |
| `install_command` | Text overlay | Animated typing | `curl -sSL ... \| bash` |

---

## 📝 Scene-by-Scene Script

### Scene 1: HOOK (00:00–00:05)
**Block:** `data-start="0" data-duration="5"`

**Visual:**
- Full-screen `assetflow_cover.svg` with subtle 1.05x zoom animation
- Cyan grid lines pulse gently
- Terminal window on right side fades in at 00:02

**Audio (HeyGen Avatar):**
> "What if your AI agent could generate video, trim clips, and build entire compositions — without writing a single line of timeline code?"

**On-screen text (fade in at 00:03):**
```
UNIVERSAL ASSET ROUTER
```

---

### Scene 2: THE PROBLEM (00:05–00:12)
**Block:** `data-start="5" data-duration="7"`

**Visual:**
- Split screen: Left = broken HTML with red error underlines, Right = confused developer face (stock or avatar)
- Quick cuts of:
  - `<video src="assets/intro.mp4">` with "404 NOT FOUND" stamp
  - `data-duration="5.0"` with a warning icon
  - FFmpeg error log scrolling

**Audio (Voiceover):**
> "Today, AI agents crash when they guess wrong paths. They hallucinate durations. They ship broken video to Hyperframes."

**On-screen text (glitch effect):**
```
❌ Hallucinated paths
❌ Wrong timeline math
❌ Broken screen recordings
```

---

### Scene 3: THE TERMINAL (00:12–00:28)
**Block:** `data-start="12" data-duration="16"`

**Visual:**
- Full-screen terminal window (styled like `assetflow_cover.svg` terminal)
- Commands type themselves out character-by-character (typing animation)

**Terminal content (typing animation):**
```bash
$ node scripts/list_local_assets.js
[ "raw_demo.mp4", "loom_2024.mp4", "logo.png" ]

$ node scripts/generate_avatar.js "Welcome to AssetFlow!" intro.mp4
[AssetFlow] Generating HeyGen Avatar video...
[AssetFlow] Video ID: abc-123-def
[AssetFlow] Polling for completion...
✅ SUCCESS: Avatar video saved.
AGENT INSTRUCTION: Use <video src="assets/intro.mp4">

$ node scripts/get_media_duration.js intro.mp4
5.23
```

**Audio (Voiceover):**
> "AssetFlow gives your agent real senses. It lists what exists, generates what doesn't, measures exact durations, and returns verified paths."

**Highlight effect:**
- Cyan box around `5.23` as it appears
- Path `assets/intro.mp4` glows when printed

---

### Scene 4: FULL PIPELINE (00:28–00:38)
**Block:** `data-start="28" data-duration="10"`

**Visual:**
- Fast-paced montage of terminal commands executing (1s each)
- Each command followed by its output, stacked vertically

**Commands shown (rapid fire):**
```bash
$ node scripts/smart_trim.js raw_demo.mp4 00:01:30 10 feature.mp4
✅ SUCCESS: Video trimmed perfectly.

$ node scripts/normalize_video.js feature.mp4 feature_final.mp4
✅ SUCCESS: Video normalized.

$ node scripts/generate_ideogram.js "neon cyberpunk skyline" bg_1.png
✅ SUCCESS: Image generated.

$ node scripts/get_media_duration.js feature_final.mp4
10.00
```

**Audio (Voiceover):**
> "Trim with FFmpeg. Normalize to 1080p60. Generate backgrounds with Ideogram. Every output is measured and path-verified."

**Side panel (appears at 00:33):**
```
Timeline so far:
├── Intro:  0.00s → 5.23s
├── Demo:   5.23s → 15.23s
└── Outro:  15.23s → 19.33s
```

---

### Scene 5: HYPERFRAMES INJECTION (00:38–00:48)
**Block:** `data-start="38" data-duration="10"`

**Visual:**
- Split screen: Left = HTML code block, Right = Hyperframes player rendering the video
- Code types itself out, and as each `<div>` appears, the corresponding video segment plays on the right

**HTML shown:**
```html
<div data-start="0" data-duration="5.23">
  <video src="assets/intro.mp4" autoplay muted />
</div>
<div data-start="5.23" data-duration="10.00">
  <video src="assets/feature_final.mp4" autoplay muted />
</div>
<div data-start="15.23" data-duration="4.10">
  <video src="assets/outro.mp4" autoplay muted />
</div>
```

**Audio (Voiceover):**
> "Zero guesswork. Zero broken timelines. The agent wrote this HTML using real durations and verified paths from AssetFlow scripts."

**Highlight:**
- `data-duration="5.23"` glows cyan when the intro video plays
- `data-duration="10.00"` glows when the demo plays
- Seamless transition between clips on the right side

---

### Scene 6: SHOWCASE UI (00:48–00:58)
**Block:** `data-start="48" data-duration="10"`

**Visual:**
- Screen recording of `assetflow-ui` gallery
- Dark-themed glassmorphism cards with provider badges (HeyGen, ElevenLabs, Ideogram)
- Hover over a card → it lifts and glows
- Click "Copy Agent Prompt" button → toast notification "Copied!"

**Audio (Voiceover):**
> "Browse the community showcase. Click to copy a prompt. Paste it into Claude Code. The agent executes — you don't manage files, you orchestrate agents."

**Cards shown:**
- `generate_avatar.js` — "AI Presenter" — HeyGen badge
- `generate_elevenlabs.js` — "Premium Voice" — ElevenLabs badge
- `generate_ideogram.js` — "Neon Background" — Ideogram badge
- `smart_trim.js` — "Hero Moment" — FFmpeg badge

---

### Scene 7: CALL TO ACTION (00:58–01:05)
**Block:** `data-start="58" data-duration="7"`

**Visual:**
- Full-screen install command typing itself out in a terminal window
- QR code or GitHub URL appears below
- Subtle background: `assetflow_cover.svg` with heavy blur

**Terminal:**
```bash
curl -sSL https://raw.githubusercontent.com/
  open-biz/assetFlow-skill/main/install.sh | bash
```

**On-screen text:**
```
One command. Ten seconds. Full pipeline.
```

**Audio (Voiceover):**
> "One command installs everything. Give your AI agent the power to generate, trim, normalize, and ship. AssetFlow."

---

### Scene 8: END CARD (01:05–01:08)
**Block:** `data-start="65" data-duration="3"`

**Visual:**
- AssetFlow logo centered
- Cyan gradient background
- Text fades in below

**On-screen text:**
```
🌊 AssetFlow
Universal Asset Router for AI Video Agents

github.com/open-biz/assetFlow-skill
```

**Audio:**
- Short musical sting or silence

---

## 🛠️ Technical Production Notes

### For HeyGen Avatar Segments
Use `scripts/generate_avatar.js` for voiceover:
```bash
node scripts/generate_avatar.js "[SCRIPT_TEXT]" scene_01.mp4
```

**Recommended avatar settings:**
- Avatar: Professional-looking, neutral background
- Voice: Clear, confident, slightly fast-paced
- Speed: `1.1` (to match energetic tone)

### For Terminal Screen Recordings
Use `asciinema` or direct terminal capture:
```bash
# Record terminal session
asciinema rec terminal_demo.cast
# Convert to video with styling
asciinema agg terminal_demo.cast terminal_demo.gif
```

Or use pure CSS/JS animation in Hyperframes with `<pre>` blocks and typing animation.

### For Hyperframes Composition
Create `demo-launch-composition.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="hyperframes.css">
</head>
<body>
  <!-- Scene 1: Cover -->
  <div data-start="0" data-duration="5" class="scene-cover">
    <img src="assets/assetflow_cover.svg" class="bg-cover zoom-slow" />
    <div class="terminal-overlay fade-in delay-2">
      <pre class="terminal">$ assetflow init</pre>
    </div>
  </div>

  <!-- Scene 2: Problem -->
  <div data-start="5" data-duration="7" class="scene-problem">
    <div class="split-left">
      <pre class="code-error">&lt;video src="WRONG_PATH"&gt;</pre>
    </div>
    <div class="split-right glitch-text">
      404 NOT FOUND
    </div>
  </div>

  <!-- Scene 3: Terminal Demo -->
  <div data-start="12" data-duration="16" class="scene-terminal">
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">assetflow — zsh</span>
      </div>
      <pre class="terminal-body" id="typing-scene-3"></pre>
    </div>
  </div>

  <!-- Continue for remaining scenes... -->
</body>
</html>
```

### For Background Music
- **Genre:** Lo-fi cyberpunk / ambient electronic
- **Tempo:** 120–130 BPM
- **Energy:** Builds during terminal scenes, drops during end card
- **Source:** Epidemic Sound, Artlist, or generate with Udio/Suno

---

## 📋 Shot Checklist

- [ ] Record `assetflow_cover.svg` as full-screen background (4K if possible)
- [ ] Record terminal typing animations (or generate with CSS)
- [ ] Generate HeyGen avatar voiceovers for each scene
- [ ] Record Hyperframes player rendering the composition
- [ ] Record `assetflow-ui` gallery interaction
- [ ] Create glitch/overlay effects for "Problem" scene
- [ ] Add background music and sound effects (typing, success chimes)
- [ ] Color grade: Cyan/teal accent (#4cd7f6), dark background (#0c1324)
- [ ] Export in 1920×1080, 60fps for Hyperframes

---

## 🚀 Quick Start for Production

```bash
# 1. Generate all avatar voiceovers
node scripts/generate_avatar.js "What if your AI agent could generate video..." scene01.mp4
node scripts/generate_avatar.js "Today, AI agents crash when they guess wrong paths..." scene02.mp4
node scripts/generate_avatar.js "AssetFlow gives your agent real senses..." scene03.mp4
node scripts/generate_avatar.js "Trim with FFmpeg. Normalize to 1080p60..." scene04.mp4
node scripts/generate_avatar.js "Zero guesswork. Zero broken timelines..." scene05.mp4
node scripts/generate_avatar.js "Browse the community showcase..." scene06.mp4
node scripts/generate_avatar.js "One command installs everything..." scene07.mp4

# 2. Get durations for timeline math
node scripts/get_media_duration.js scene01.mp4
node scripts/get_media_duration.js scene02.mp4
# ... etc

# 3. Assemble in Hyperframes with exact durations
# Use the duration values to set data-duration attributes
```

---

## 🎯 Key Message for Judges

> **"AssetFlow isn't a video editor. It's a sensory system for AI agents. We turned the biggest pain point in programmatic video — asset management — into a one-command, zero-hallucination pipeline. The agent sees, generates, measures, and ships. You just describe what you want."**

---

*Generated for the HeyGen Hackathon — Product Track*  
*Repo: github.com/open-biz/assetFlow-skill*
