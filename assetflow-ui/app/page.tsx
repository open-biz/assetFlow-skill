"use client";

import { useState } from "react";
import { Sparkles, Layers, Terminal, ArrowRight, Search } from "lucide-react";
import { assets } from "@/lib/assets";
import AssetCard from "@/components/AssetCard";

const providers = ["All", "HeyGen", "ElevenLabs", "Ideogram", "Community"] as const;

type Provider = (typeof providers)[number];

export default function Home() {
  const [activeProvider, setActiveProvider] = useState<Provider>("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    <main className="min-h-screen bg-[#0a0f1c]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              <Sparkles className="w-4 h-4" />
              <span>HeyGen Hackathon — Product Track</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              AssetFlow
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              The <span className="text-accent font-semibold">Universal Media Router</span> for AI Video Agents.
              Discover, preview, and deploy AI-generated assets directly into your Hyperframes workflow.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent-glow transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-[0.98]"
              >
                <Layers className="w-5 h-5" />
                Browse Assets
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold hover:border-slate-500 hover:text-white transition-all duration-200"
              >
                <Terminal className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {providers.map((p) => (
              <button
                key={p}
                onClick={() => setActiveProvider(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeProvider === p
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50"
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
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 w-full md:w-64 transition-all"
            />
          </div>
        </div>

        {/* Asset Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No assets match your filters.</p>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Discover</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Browse curated AI assets from HeyGen, ElevenLabs, Ideogram, and the community.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Copy Prompt</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Click "Copy Agent Prompt" to get a CLI command. Paste it into Claude Code or Cursor.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Agent Executes</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your AI Agent runs the script, generates the asset, and injects it into Hyperframes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>Built for the HeyGen Hackathon — Product Track</p>
          <p className="mt-1">AssetFlow · Autonomous Media Orchestrator</p>
        </div>
      </footer>
    </main>
  );
}
