# 🤖 Agent Prompts for Hyperframes

This directory contains pre-written prompt templates that you copy-paste into **Claude Code**, **Claude Design**, **OpenDesign**, **Cursor Composer**, or any AI agent that writes code.

Each template is a complete, self-contained instruction block. The agent reads it, runs AssetFlow scripts to generate and measure media, and writes perfect Hyperframes HTML with zero path or duration hallucination.

## Quick Start

1. Pick a template below.
2. Copy the entire `.md` file contents.
3. Paste it into your AI agent.
4. The agent executes the scripts and writes the composition.

## Templates

| # | Template | Use Case | Key Features |
|---|---|---|---|
| `01` | [Landing Page Product Demo](./01-landing-page-demo.md) | Homepage hero section | Intro avatar → Screen recording → Outro CTA |
| `02` | [Tutorial / How-To Walkthrough](./02-tutorial-walkthrough.md) | Documentation & onboarding | Title card → Narrated walkthrough → Outro |
| `03` | [Sales Pitch with Custom Background](./03-sales-pitch.md) | Sales & investor decks | Ideogram background + Avatar overlay + ElevenLabs voiceover |
| `04` | [Social Media Ad](./04-social-media-ad.md) | Short-form social feeds | Hook → Demo → CTA (~15s total) |
| `05` | [Product Announcement / Changelog Reveal](./05-product-announcement.md) | Launch day hype video | Teaser → 3 feature reveals → B-roll → Final CTA |
| `06` | [Testimonial Montage](./06-testimonial-montage.md) | Social proof compilation | Multi-clip trimming + normalization + timeline stitching |

## How It Works

Every template follows the **AssetFlow Agent Protocol**:

1. **List** existing assets (`list_local_assets.js`)
2. **Generate** missing media (avatars, voiceovers, backgrounds)
3. **Measure** exact durations (`get_media_duration.js`)
4. **Trim & normalize** raw recordings (`smart_trim.js`, `normalize_video.js`)
5. **Write** Hyperframes HTML using real float values — never guesses

## Pro Tips

- **Before generating:** Always run Step 1 (`list_local_assets.js`) so the agent doesn't recreate files you already have.
- **Raw recordings:** If using Loom/Zoom exports, always run `normalize_video.js` — Hyperframes crashes on variable framerates.
- **Durations:** The templates use placeholders like `TITLE_DURATION`. The agent replaces these with exact floats (e.g., `5.23`). Do not round.
- **Voiceover sync:** In tutorial templates, measure the voiceover first, then trim the screen recording to match its exact length.

## Customizing Templates

You can mix and match scenes across templates. For example:
- Take the **Background Layer** from `03-sales-pitch.md`
- Add the **Multi-Feature Reveals** from `05-product-announcement.md`
- End with the **Testimonial Montage** from `06-testimonial-montage.md`

AssetFlow scripts are composable — your imagination is the only limit.

---

**Need a new template?** Open an issue or PR with your use case and we'll add it to the collection.
