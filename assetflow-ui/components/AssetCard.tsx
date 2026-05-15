"use client";

import { Video, AudioLines, Image as ImageIcon, Zap, ArrowUpRight } from "lucide-react";
import { Asset } from "@/lib/assets";
import CopyButton from "./CopyButton";

const providerConfig: Record<string, { color: string; label: string; glow: string }> = {
  heygen: {
    color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    label: "HeyGen",
    glow: "group-hover:shadow-rose-500/10",
  },
  elevenlabs: {
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    label: "ElevenLabs",
    glow: "group-hover:shadow-emerald-500/10",
  },
  ideogram: {
    color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    label: "Ideogram",
    glow: "group-hover:shadow-violet-500/10",
  },
  community: {
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    label: "Community",
    glow: "group-hover:shadow-cyan-500/10",
  },
};

const typeConfig: Record<string, { icon: typeof Video; label: string }> = {
  video: { icon: Video, label: "Video" },
  audio: { icon: AudioLines, label: "Audio" },
  image: { icon: ImageIcon, label: "Image" },
};

interface AssetCardProps {
  asset: Asset;
  index?: number;
}

export default function AssetCard({ asset, index = 0 }: AssetCardProps) {
  const config = providerConfig[asset.provider];
  const typeInfo = typeConfig[asset.type];
  const Icon = typeInfo.icon;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 to-[#080c14]/90 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-slate-600/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 ${config.glow} animate-scale-in opacity-0`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Preview Area */}
      <div className={`relative h-44 flex items-center justify-center ${asset.previewColor} overflow-hidden`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
        </div>

        <div className="relative flex flex-col items-center gap-3 z-10">
          <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
            <Icon className="w-7 h-7 text-white/90" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {typeInfo.label}
          </span>
        </div>

        {/* Provider Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${config.color} flex items-center gap-1.5 shadow-lg`}>
          <Zap className="w-3 h-3" />
          {config.label}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-100 leading-snug group-hover:text-white transition-colors">
            {asset.name}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-0.5" />
        </div>

        <p className="text-sm text-slate-400 leading-relaxed flex-1">
          {asset.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {asset.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:border-slate-600/60 hover:text-slate-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="pt-3 border-t border-slate-800/50 mt-1">
          <CopyButton text={asset.agentPrompt} />
        </div>
      </div>
    </div>
  );
}
