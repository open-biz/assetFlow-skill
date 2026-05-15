# 🏠 Landing Page Product Demo

> Copy this entire block and paste it into Claude / OpenDesign / Cursor.

## Agent Instructions

You are building a Hyperframes landing page composition. It has three scenes:
1. **Intro** — An AI avatar welcomes the visitor.
2. **Demo** — A 10-second screen recording of the product in action.
3. **Outro** — An AI avatar delivers a CTA.

## Step-by-Step Execution

Follow this exact order. Run each script and capture the output before writing HTML.

### 1. Check existing assets
```bash
node scripts/list_local_assets.js
```

### 2. Generate intro avatar
```bash
node scripts/generate_avatar.js "Welcome to our product. Let me show you what it can do." intro.mp4
```

### 3. Measure intro duration
```bash
node scripts/get_media_duration.js intro.mp4
```

### 4. Trim the screen recording to a 10-second hero moment
> Adjust start time to your actual recording.
```bash
node scripts/smart_trim.js raw_demo.mp4 00:00:45 10 demo.mp4
```

### 5. Normalize the demo clip
```bash
node scripts/normalize_video.js demo.mp4 demo_final.mp4
```

### 6. Measure demo duration
```bash
node scripts/get_media_duration.js demo_final.mp4
```

### 7. Generate outro avatar
```bash
node scripts/generate_avatar.js "Ready to get started? Sign up today." outro.mp4
```

### 8. Measure outro duration
```bash
node scripts/get_media_duration.js outro.mp4
```

### 9. Write the Hyperframes HTML

Use the exact durations returned by the scripts. Do not guess.

```html
<!-- SCENE 1: Intro -->
<div data-start="0" data-duration="INTRO_DURATION">
  <video src="assets/intro.mp4" autoplay muted></video>
</div>

<!-- SCENE 2: Product Demo -->
<div data-start="INTRO_DURATION" data-duration="DEMO_DURATION">
  <video src="assets/demo_final.mp4" autoplay muted></video>
</div>

<!-- SCENE 3: Outro CTA -->
<div data-start="INTRO_DURATION + DEMO_DURATION">
  <video src="assets/outro.mp4" autoplay muted></video>
</div>
```

Replace `INTRO_DURATION`, `DEMO_DURATION`, and the start offsets with the exact float values returned by `get_media_duration.js`.

## Output Requirements
- Save the HTML file to `compositions/landing-page.html` (or the `paths.blocks` folder from `hyperframes.json`).
- Confirm all `<video>` `src` attributes use the exact relative paths printed by the scripts.
