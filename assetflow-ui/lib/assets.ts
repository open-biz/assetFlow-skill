export interface Asset {
  id: string;
  name: string;
  provider: "heygen" | "elevenlabs" | "ideogram" | "community";
  type: "video" | "audio" | "image";
  description: string;
  tags: string[];
  agentPrompt: string;
  previewColor: string;
}

export const assets: Asset[] = [
  {
    id: "heygen-welcome-avatar",
    name: "Welcome Avatar — Daisy",
    provider: "heygen",
    type: "video",
    description: "A professional AI presenter saying 'Welcome to AssetFlow'. Perfect for intros.",
    tags: ["avatar", "intro", "presenter"],
    agentPrompt:
      'node scripts/generate_avatar.js "Welcome to AssetFlow! Let me show you how it works." welcome_daisy.mp4',
    previewColor: "bg-rose-500/20",
  },
  {
    id: "elevenlabs-narrator",
    name: "Narrator Voiceover",
    provider: "elevenlabs",
    type: "audio",
    description: "Premium ElevenLabs narrator voice. Warm, professional, perfect for explainers.",
    tags: ["voiceover", "narrator", "premium"],
    agentPrompt:
      'node scripts/generate_elevenlabs.js "AssetFlow gives AI agents the power to generate, trim, and normalize video assets autonomously." 21m00Tcm4TlvDq8ikWAM narrator_vo.mp3',
    previewColor: "bg-emerald-500/20",
  },
  {
    id: "ideogram-neon-city",
    name: "Neon City Background",
    provider: "ideogram",
    type: "image",
    description: "A stunning 16:9 futuristic neon city skyline. Perfect for tech video backgrounds.",
    tags: ["background", "neon", "futuristic"],
    agentPrompt:
      'node scripts/generate_ideogram.js "futuristic neon city skyline at night with holographic billboards, cyberpunk style, ultra detailed" neon_city.png',
    previewColor: "bg-violet-500/20",
  },
  {
    id: "heygen-cta-avatar",
    name: "Call-to-Action Avatar",
    provider: "heygen",
    type: "video",
    description: "An energetic AI presenter delivering a strong call-to-action. Great for outros.",
    tags: ["avatar", "outro", "cta"],
    agentPrompt:
      'node scripts/generate_avatar.js "Ready to build with AssetFlow? Let\'s get started!" cta_avatar.mp4',
    previewColor: "bg-amber-500/20",
  },
  {
    id: "elevenlabs-excited",
    name: "Excited Host Voice",
    provider: "elevenlabs",
    type: "audio",
    description: "An upbeat, energetic ElevenLabs voice. Ideal for high-energy product demos.",
    tags: ["voiceover", "excited", "host"],
    agentPrompt:
      'node scripts/generate_elevenlabs.js "This is AssetFlow — the autonomous media orchestrator for AI agents!" pFZfAXFdQdHR1AH8F1vE excited_host.mp3',
    previewColor: "bg-sky-500/20",
  },
  {
    id: "ideogram-minimal-office",
    name: "Minimal Office Background",
    provider: "ideogram",
    type: "image",
    description: "Clean, minimal office background with soft lighting. Perfect for SaaS videos.",
    tags: ["background", "minimal", "office"],
    agentPrompt:
      'node scripts/generate_ideogram.js "minimal modern office interior with soft natural lighting, clean aesthetic, 16:9" minimal_office.png',
    previewColor: "bg-teal-500/20",
  },
  {
    id: "community-ui-wrapper-1",
    name: "Glass UI Wrapper",
    provider: "community",
    type: "image",
    description: "Pre-made glassmorphism UI wrapper for overlaying on Hyperframes compositions.",
    tags: ["ui", "wrapper", "glassmorphism"],
    agentPrompt:
      'node scripts/pull_community_asset.js @community/ui-glass-wrapper-1',
    previewColor: "bg-cyan-500/20",
  },
  {
    id: "heygen-demo-avatar",
    name: "Product Demo Presenter",
    provider: "heygen",
    type: "video",
    description: "A calm, knowledgeable presenter perfect for walking through product features.",
    tags: ["avatar", "demo", "presenter"],
    agentPrompt:
      'node scripts/generate_avatar.js "Let me walk you through the key features of AssetFlow." demo_presenter.mp4',
    previewColor: "bg-indigo-500/20",
  },
];
