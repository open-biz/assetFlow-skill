# 🗣️ Testimonial / Social Proof Montage

> Copy this entire block and paste it into Claude / OpenDesign / Cursor.

## Agent Instructions

You are building a Hyperframes testimonial montage. It stitches together multiple raw video clips (user recordings, Loom links, Zoom exports) into a seamless social-proof sequence.

It features:
1. **Title Card** — Avatar intro: "Here's what our users are saying."
2. **Clip 1** — Trimmed testimonial segment.
3. **Clip 2** — Another trimmed segment.
4. **Clip 3** — Final trimmed segment.
5. **Outro** — Avatar CTA overlay.

## Step-by-Step Execution

### 1. Check existing assets
```bash
node scripts/list_local_assets.js
```

### 2. Generate title card avatar
```bash
node scripts/generate_avatar.js "Don't just take our word for it. Here's what real users are saying." title.mp4
```

### 3. Measure title duration
```bash
node scripts/get_media_duration.js title.mp4
```

### 4. Trim and normalize each raw testimonial clip
> Adjust start times and durations to the best moments from each raw file.

```bash
# Testimonial 1 — best 8 seconds
node scripts/smart_trim.js raw_testimonial_1.mp4 00:00:15 8 t1_raw.mp4
node scripts/normalize_video.js t1_raw.mp4 t1.mp4

# Testimonial 2 — best 6 seconds
node scripts/smart_trim.js raw_testimonial_2.mp4 00:00:22 6 t2_raw.mp4
node scripts/normalize_video.js t2_raw.mp4 t2.mp4

# Testimonial 3 — best 7 seconds
node scripts/smart_trim.js raw_testimonial_3.mp4 00:00:10 7 t3_raw.mp4
node scripts/normalize_video.js t3_raw.mp4 t3.mp4
```

### 5. Measure each normalized clip
```bash
node scripts/get_media_duration.js t1.mp4
node scripts/get_media_duration.js t2.mp4
node scripts/get_media_duration.js t3.mp4
```

### 6. Generate outro CTA avatar (semi-transparent overlay style)
```bash
node scripts/generate_avatar.js "Join thousands of teams already shipping faster. Start free today." outro.mp4
```

### 7. Measure outro duration
```bash
node scripts/get_media_duration.js outro.mp4
```

### 8. Write the Hyperframes HTML

Calculate cumulative timeline:
- title: 0 → TITLE_DURATION
- t1: TITLE_DURATION → TITLE_DURATION + T1_DURATION
- t2: TITLE_DURATION + T1_DURATION → + T2_DURATION
- t3: previous sum → + T3_DURATION
- outro: final sum → end

```html
<!-- SCENE 1: Title Card -->
<div data-start="0" data-duration="TITLE_DURATION">
  <video src="assets/title.mp4" autoplay muted></video>
</div>

<!-- SCENE 2: Testimonial 1 -->
<div data-start="TITLE_DURATION" data-duration="T1_DURATION">
  <video src="assets/t1.mp4" autoplay muted></video>
</div>

<!-- SCENE 3: Testimonial 2 -->
<div data-start="TITLE_DURATION + T1_DURATION" data-duration="T2_DURATION">
  <video src="assets/t2.mp4" autoplay muted></video>
</div>

<!-- SCENE 4: Testimonial 3 -->
<div data-start="TITLE_DURATION + T1_DURATION + T2_DURATION" data-duration="T3_DURATION">
  <video src="assets/t3.mp4" autoplay muted></video>
</div>

<!-- SCENE 5: Outro CTA -->
<div data-start="TITLE_DURATION + T1_DURATION + T2_DURATION + T3_DURATION">
  <video src="assets/outro.mp4" autoplay muted style="position:absolute; bottom:20px; right:20px; width:30%; border-radius:12px;"></video>
</div>
```

## Output Requirements
- Save to `compositions/testimonial-montage.html`.
- Ensure every raw clip is normalized before placement — Hyperframes crashes on variable framerates from Zoom/Loom exports.
- If a testimonial has background noise, consider using `normalize_video.js` output only (it also standardizes audio codec to AAC).
