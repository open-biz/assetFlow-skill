"use client";

import { useState } from "react";
import {
  Sparkles,
  Layers,
  Terminal,
  ArrowRight,
  Search,
  Copy,
  Check,
  Zap,
  GitBranch,
  Clock,
  Shield,
  Rocket,
  ChevronRight,
  ExternalLink,
  Download,
  PlayCircle,
} from "lucide-react";
import { assets } from "@/lib/assets";
import AssetCard from "@/components/AssetCard";
import TerminalDemo from "@/components/TerminalDemo";

const providers = ["All", "HeyGen", "ElevenLabs", "Ideogram", "Community"] as const;
type Provider = (typeof providers)[number];

const stats = [
  { label: "Scripts", value: "10+", icon: Terminal, desc: "Agent-ready CLI tools" },
  { label: "Providers", value: "4", icon: Zap, desc: "HeyGen, ElevenLabs, Ideogram, Community" },
  { label: "Prompts", value: "6", icon: Sparkles, desc: "Pre-built Hyperframes templates" },
  { label: "Setup Time", value: "<10s", icon: Clock, desc: "One-liner curl | bash install" },
];

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discover",
    desc: "Browse curated AI assets from HeyGen avatars, ElevenLabs voices, Ideogram backgrounds, and community contributions.",
  },
  {
    num: "02",
    icon: Copy,
    title: "Copy Prompt",
    desc: "Click \"Copy Agent Prompt\" to get a CLI command. Paste it into Claude Code, OpenDesign, or Cursor.",
  },
  {
    num: "03",
    icon: Terminal,
    title: "Agent Executes",
    desc: "Your AI agent runs the script, generates the asset, measures its duration, and writes perfect Hyperframes HTML.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Ship Video",
    desc: "Zero hallucinated paths. Zero broken timelines. Your composition is ready to render in Hyperframes Studio.",
  },
];

export default function Home() {
  const [activeProvider, setActiveProvider] = useState<Provider>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [installCopied, setInstallCopied] = useState(false);

  const installCommand =
    "curl -sSL https://raw.githubusercontent.com/open-biz/assetFlow-skill/main/install.sh | bash";

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const filtered = assets.filter((a) => {
    const matchProvider =
      activeProvider === "All" ||
      a.provider.toLowerCase() === activeProvider.toLowerCase();
    const matchSearch =
      searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchProvider && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-[#dce1fb] relative overflow-x-hidden font-body">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none z-0" />

      {/* ===== TOP NAV ===== */}
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-[#1e293b] transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="font-headline text-xl font-bold tracking-tight text-[#4cd7f6] hover:text-[#22d3ee] transition-colors">
              AssetFlow
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors">Docs</a>
              <a href="#" className="text-sm text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors">Features</a>
              <a href="#gallery" className="text-sm text-[#4cd7f6] border-b-2 border-[#4cd7f6] pb-0.5">Showcase</a>
              <a href="#" className="text-sm text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors">Community</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/open-biz/assetFlow-skill"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#4cd7f6] text-[#003640] text-sm font-semibold hover:shadow-[0_0_15px_rgba(76,215,246,0.5)] transition-all duration-300"
            >
              <Layers className="w-4 h-4" />
              Browse Assets
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 border-b border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
          <div className="flex flex-col items-center text-center gap-7 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="animate-slide-up opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 text-cyan-400 text-sm font-medium border border-cyan-500/15 hover:border-cyan-500/30 transition-colors cursor-default">
              <Sparkles className="w-4 h-4" />
              <span>HeyGen Hackathon — Product Track Winner</span>
            </div>

            {/* Title */}
            <h1 className="animate-slide-up opacity-0 delay-100 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="text-gradient">AssetFlow</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-slide-up opacity-0 delay-200 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">
              The <span className="text-cyan-400 font-semibold">Universal Asset Router</span> for AI Video Agents. Give Cursor, Claude Code, and OpenDesign the native ability to generate, trim, normalize, and inject assets into Hyperframes — with zero hallucination.
            </p>

            {/* Install Block */}
            <div className="animate-slide-up opacity-0 delay-300 w-full max-w-2xl mx-auto mt-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-cyan-500/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-700" />
                <div className="relative flex items-center gap-3 px-5 py-4 rounded-xl bg-[#050a14] border border-slate-700/60 font-mono text-sm text-slate-300 shadow-2xl">
                  <span className="text-cyan-600 select-none shrink-0">$</span>
                  <code className="flex-1 overflow-x-auto whitespace-nowrap text-slate-200 scrollbar-hide text-left">
                    {installCommand}
                  </code>
                  <button
                    onClick={handleCopyInstall}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-xs font-medium text-slate-400 hover:text-white transition-all duration-200 border border-slate-700 hover:border-slate-500"
                  >
                    {installCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 text-center">
                Requires Node.js + FFmpeg. One command clones, installs, and scaffolds.
              </p>
            </div>

            {/* CTAs */}
            <div className="animate-slide-up opacity-0 delay-400 flex flex-wrap items-center justify-center gap-3 mt-2">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-sm font-semibold border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Layers className="w-4 h-4" />
                Browse Assets
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/open-biz/assetFlow-skill"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700/60 text-slate-400 text-sm font-semibold hover:border-slate-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <GitBranch className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700/60 text-slate-400 text-sm font-semibold hover:border-slate-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <PlayCircle className="w-4 h-4" />
                See It Work
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-slate-700">
          <ChevronRight className="w-5 h-5 rotate-90" />
        </div>
      </section>

      {/* ===== LIVE TERMINAL DEMO ===== */}
      <section id="demo" className="relative z-10 py-20 md:py-28 border-b border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 text-cyan-400/80 text-xs font-medium border border-cyan-500/10 mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>Live Simulation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Watch AssetFlow in Action
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A real Agent workflow: list assets, generate an avatar, trim a recording, normalize it, and get exact durations for timeline math.
            </p>
          </div>
          <TerminalDemo />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 py-16 border-b border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center hover:border-slate-600/40 transition-all duration-300 group animate-slide-up opacity-0"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-cyan-500/15 transition-all duration-300">
                  <stat.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-200 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ASSET GALLERY ===== */}
      <section id="gallery" className="relative z-10 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 text-cyan-400/80 text-xs font-medium border border-cyan-500/10 mb-4">
              <Download className="w-3.5 h-3.5" />
              <span>Asset Registry</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Pre-Built Agent Commands
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every card generates a ready-to-paste CLI command. Your AI agent runs it, and the asset appears in your Hyperframes project.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {providers.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProvider(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeProvider === p
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-700/40 hover:border-slate-600/50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search assets, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 w-full md:w-64 transition-all glass"
              />
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((asset, i) => (
                <AssetCard key={asset.id} asset={asset} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Search className="w-10 h-10 text-slate-700 mx-auto mb-4" />
              <p className="text-lg text-slate-500">No assets match your filters.</p>
              <button
                onClick={() => { setActiveProvider("All"); setSearchQuery(""); }}
                className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 py-20 md:py-28 border-t border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 text-cyan-400/80 text-xs font-medium border border-cyan-500/10 mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>Agent-First Architecture</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              How AssetFlow Works
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A complete sensory system for AI agents. See what assets exist, generate what you need, and measure everything before writing a single line of HTML.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="group relative glass rounded-2xl p-6 hover:border-slate-600/40 transition-all duration-500 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: `${i * 120}ms`, animationFillMode: "forwards" }}
              >
                <div className="absolute -top-3 -right-2 text-6xl font-black text-slate-800/50 select-none group-hover:text-cyan-500/10 transition-colors duration-500">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-500/15 transition-all duration-300">
                    <step.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative z-10 py-20 md:py-28 border-t border-[#1e293b]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/15 bg-gradient-to-b from-[#0a1628] to-[#050a14] p-10 md:p-14 text-center">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 text-cyan-400 text-xs font-medium border border-cyan-500/10 mb-6">
                <Rocket className="w-3.5 h-3.5" />
                <span>Get Started in 10 Seconds</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to give your AI Agent <span className="text-gradient">superpowers</span>?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                Install AssetFlow, paste a prompt from the gallery, and watch your agent generate, trim, and normalize video assets autonomously.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleCopyInstall}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-sm font-semibold shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {installCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied to clipboard!
                    </>
                  ) : (
                    <>
                      <Terminal className="w-4 h-4" />
                      Copy Install Command
                      <Copy className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700/60 text-slate-300 text-sm font-semibold hover:border-slate-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Browse Templates
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-[#1e293b] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AssetFlow</p>
                <p className="text-xs text-slate-500">Autonomous Media Orchestrator</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a
                href="https://github.com/open-biz/assetFlow-skill"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <GitBranch className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a href="#gallery" className="hover:text-cyan-400 transition-colors">
                Assets
              </a>
              <a href="#demo" className="hover:text-cyan-400 transition-colors">
                Demo
              </a>
            </div>

            <p className="text-xs text-slate-600">
              Built for the HeyGen Hackathon — Product Track
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
