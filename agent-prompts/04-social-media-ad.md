# 📱 Social Media Ad (15–30 Seconds)

> Copy this entire block and paste it into Claude / OpenDesign / Cursor.

## Agent Instructions

You are building a punchy, short-form Hyperframes ad optimized for social feeds. It features:
1. **Hook** — A 3-second AI avatar hook that stops the scroll.
2. **Problem/Solution Demo** — A 7-second screen recording or product shot.
3. **CTA** — A 5-second outro with strong call-to-action.

Total target: ~15 seconds. Every frame counts.

## Step-by-Step Execution

### 1. Check existing assets
```bash
node scripts/list_local_assets.js
```

### 2. Generate scroll-stopping hook avatar
```bash
node scripts/generate_avatar.js "Stop. Before you spend another hour editing video, watch this." hook.mp4
```

### 3. Measure hook duration (target ~3s)
```bash
node scripts/get_media_duration.js hook.mp4
```

### 4. Trim the product demo to exactly 7 seconds
> Adjust start time to the most impactful moment of your raw recording.
```bash
node scripts/smart_trim.js raw_demo.mp4 00:00:12 7 demo.mp4
```

### 5. Normalize the demo clip
```bash
node scripts/normalize_video.js demo.mp4 demo_final.mp4
```

### 6. Measure demo duration
```bash
node scripts/get_media_duration.js demo_final.mp4
```

### 7. Generate CTA outro avatar
```bash
node scripts/generate_avatar.js "One click. Zero editing. Try AssetFlow free. Link in bio." cta.mp4
```

### 8. Measure CTA duration
```bash
node scripts/get_media_duration.js cta.mp4
```

### 9. Write the Hyperframes HTML

```html
<!-- SCENE 1: Hook (0s → HOOK_DURATION) -->
<div data-start="0" data-duration="HOOK_DURATION">
  <video src="assets/hook.mp4" autoplay muted style="width:100%; height:100%; object-fit:cover;"></video>
</div>

<!-- SCENE 2: Demo (HOOK_DURATION → HOOK_DURATION + DEMO_DURATION) -->
<div data-start="HOOK_DURATION" data-duration="DEMO_DURATION">
  <video src="assets/demo_final.mp4" autoplay muted style="width:100%; height:100%; object-fit:cover;"></video>
</div>

<!-- SCENE 3: CTA (HOOK_DURATION + DEMO_DURATION → end) -->
<div data-start="HOOK_DURATION + DEMO_DURATION">
  <video src="assets/cta.mp4" autoplay muted style="width:100%; height:100%; object-fit:cover;"></video>
</div>
```

Replace all placeholders with exact float values.

## Output Requirements
- Save to `compositions/social-ad.html`.
- Add bold text overlays using `<div>` elements with `style="position:absolute;"` if the agent supports inline styling.
- Keep pacing tight — no dead air between scenes.
