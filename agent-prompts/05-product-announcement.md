# 🚀 Product Announcement / Changelog Reveal

> Copy this entire block and paste it into Claude / OpenDesign / Cursor.

## Agent Instructions

You are building a dramatic Hyperframes product announcement. It features:
1. **Teaser** — A mysterious 2-second avatar clip: "Something big is coming."
2. **Feature Reveals** — Three rapid-fire 3-second avatar clips announcing each new feature.
3. **Sizzle Montage** — 8 seconds of trimmed product footage or AI-generated B-roll.
4. **Final CTA** — Avatar invites viewers to try it now.

## Step-by-Step Execution

### 1. Check existing assets
```bash
node scripts/list_local_assets.js
```

### 2. Generate teaser avatar
```bash
node scripts/generate_avatar.js "Something big is coming. Are you ready?" teaser.mp4
```

### 3. Measure teaser duration
```bash
node scripts/get_media_duration.js teaser.mp4
```

### 4. Generate feature reveal avatars (3 clips)
```bash
node scripts/generate_avatar.js "Feature One: Autonomous asset generation. Your AI now has hands." feat1.mp4
node scripts/generate_avatar.js "Feature Two: One-click normalization. No more broken frame rates." feat2.mp4
node scripts/generate_avatar.js "Feature Three: Timeline-perfect math. Zero hallucination." feat3.mp4
```

### 5. Measure each feature duration
```bash
node scripts/get_media_duration.js feat1.mp4
node scripts/get_media_duration.js feat2.mp4
node scripts/get_media_duration.js feat3.mp4
```

### 6. Generate AI B-roll background (optional, for cinematic flair)
```bash
node scripts/generate_video_google.js "futuristic holographic interface, cinematic, slow pan, neon accents, 1080p" broll.mp4
```
> Note: Google Veo generation takes time. Skip this step if speed is critical and use a static Ideogram background instead.

Alternative static background:
```bash
node scripts/generate_ideogram.js "futuristic product launch stage, neon lights, cinematic 16:9" broll_bg.png
```

### 7. Generate final CTA avatar
```bash
node scripts/generate_avatar.js "AssetFlow is live. Try it today and build video at the speed of thought." cta.mp4
```

### 8. Measure CTA duration
```bash
node scripts/get_media_duration.js cta.mp4
```

### 9. Write the Hyperframes HTML

Calculate cumulative start times exactly:
- teaser starts at 0
- feat1 starts at TEASER_DURATION
- feat2 starts at TEASER_DURATION + FEAT1_DURATION
- feat3 starts at TEASER_DURATION + FEAT1_DURATION + FEAT2_DURATION
- B-roll / background starts at TEASER_DURATION + FEAT1_DURATION + FEAT2_DURATION + FEAT3_DURATION
- CTA starts at that sum + BROLL_DURATION (or continues over background)

```html
<!-- SCENE 1: Teaser -->
<div data-start="0" data-duration="TEASER_DURATION">
  <video src="assets/teaser.mp4" autoplay muted></video>
</div>

<!-- SCENE 2: Feature 1 -->
<div data-start="TEASER_DURATION" data-duration="FEAT1_DURATION">
  <video src="assets/feat1.mp4" autoplay muted></video>
</div>

<!-- SCENE 3: Feature 2 -->
<div data-start="TEASER_DURATION + FEAT1_DURATION" data-duration="FEAT2_DURATION">
  <video src="assets/feat2.mp4" autoplay muted></video>
</div>

<!-- SCENE 4: Feature 3 -->
<div data-start="TEASER_DURATION + FEAT1_DURATION + FEAT2_DURATION" data-duration="FEAT3_DURATION">
  <video src="assets/feat3.mp4" autoplay muted></video>
</div>

<!-- SCENE 5: B-Roll / Background Layer -->
<div data-start="TEASER_DURATION + FEAT1_DURATION + FEAT2_DURATION + FEAT3_DURATION" data-duration="BROLL_DURATION">
  <video src="assets/broll.mp4" autoplay muted style="width:100%; height:100%; object-fit:cover;"></video>
  <!-- or <img src="assets/broll_bg.png" style="width:100%; height:100%; object-fit:cover;"> -->
</div>

<!-- SCENE 6: Final CTA -->
<div data-start="TEASER_DURATION + FEAT1_DURATION + FEAT2_DURATION + FEAT3_DURATION + BROLL_DURATION">
  <video src="assets/cta.mp4" autoplay muted></video>
</div>
```

## Output Requirements
- Save to `compositions/product-announcement.html`.
- Ensure cumulative start times are calculated with precision — no rounding.
- If using the B-roll video layer, consider placing it as a full-screen background behind the CTA for a cinematic finish.
