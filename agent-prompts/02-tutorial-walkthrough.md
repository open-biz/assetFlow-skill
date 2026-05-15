# 🎓 Tutorial / How-To Walkthrough

> Copy this entire block and paste it into Claude / OpenDesign / Cursor.

## Agent Instructions

You are building a Hyperframes tutorial composition. It has:
1. **Title Card** — An AI avatar introduces the tutorial topic.
2. **Narrated Walkthrough** — A screen recording with AI voiceover explaining each step.
3. **Outro** — Avatar thanks the viewer and links to docs.

## Step-by-Step Execution

### 1. Check existing assets
```bash
node scripts/list_local_assets.js
```

### 2. Generate title card avatar
```bash
node scripts/generate_avatar.js "In this tutorial, I'll show you how to set up AssetFlow in under 5 minutes." title.mp4
```

### 3. Measure title duration
```bash
node scripts/get_media_duration.js title.mp4
```

### 4. Generate voiceover narration for the walkthrough
```bash
node scripts/generate_voiceover.js "First, clone the repository. Then run npm install. Finally, execute the one-liner installer. That's it — you're ready to go." narration.mp3
```

### 5. Measure voiceover duration
```bash
node scripts/get_media_duration.js narration.mp3
```

### 6. Trim screen recording to match voiceover length
> Adjust start time to the relevant section of your raw recording.
```bash
node scripts/smart_trim.js raw_tutorial.mp4 00:00:00 VOICEOVER_DURATION walkthrough.mp4
```
Replace `VOICEOVER_DURATION` with the exact float from Step 5.

### 7. Normalize the walkthrough clip
```bash
node scripts/normalize_video.js walkthrough.mp4 walkthrough_final.mp4
```

### 8. Measure normalized walkthrough duration
```bash
node scripts/get_media_duration.js walkthrough_final.mp4
```

### 9. Generate outro avatar
```bash
node scripts/generate_avatar.js "You did it! Check the README for advanced features." outro.mp4
```

### 10. Measure outro duration
```bash
node scripts/get_media_duration.js outro.mp4
```

### 11. Write the Hyperframes HTML

```html
<!-- SCENE 1: Title Card -->
<div data-start="0" data-duration="TITLE_DURATION">
  <video src="assets/title.mp4" autoplay muted></video>
</div>

<!-- SCENE 2: Walkthrough + Voiceover -->
<div data-start="TITLE_DURATION" data-duration="WALKTHROUGH_DURATION">
  <video src="assets/walkthrough_final.mp4" autoplay muted></video>
  <audio src="assets/narration.mp3" autoplay></audio>
</div>

<!-- SCENE 3: Outro -->
<div data-start="TITLE_DURATION + WALKTHROUGH_DURATION">
  <video src="assets/outro.mp4" autoplay muted></video>
</div>
```

Replace all `*_DURATION` placeholders with exact float values.

## Output Requirements
- Save to `compositions/tutorial.html` (or the `paths.blocks` folder from `hyperframes.json`).
- Ensure `<audio>` tag is present and properly timed with the video.
