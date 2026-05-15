"use client";

import { Video, AudioLines, Image as ImageIcon, Zap } from "lucide-react";
import { Asset } from "@/lib/assets";
import CopyButton from "./CopyButton";

const providerColors: Record<string, string> = {
  heygen: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  elevenlabs: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  ideogram: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  community: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const providerLabels: Record<string, string> = {
  heygen: "HeyGen",
  elevenlabs: "ElevenLabs",
  ideogram: "Ideogram",
  community: "Community",
};

const typeIcons = {
  video: Video,
  audio: AudioLines,
  image: ImageIcon,
};

interface AssetCardProps {
  asset: Asset;
}

export default function AssetCard({ asset }: AssetCardProps) {
  const Icon = typeIcons[asset.type];

  return (
    <div className="group relative flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20">
      {/* Preview Area */}
      <div className={`relative h-40 flex items-center justify-center ${asset.previewColor} transition-all duration-500 group-hover:brightness-110`}>
        <div className="flex flex-col items-center gap-2">
          <Icon className="w-10 h-10 text-white/80" />
          <span className="text-xs font-medium uppercase tracking-wider text-white/60">
            {asset.type}
          </span>
        </div>
        
        {/* Provider Badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${providerColors[asset.provider]}`}>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {providerLabels[asset.provider]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-base font-semibold text-slate-100 leading-snug">
          {asset.name}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed flex-1">
          {asset.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {asset.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-md bg-slate-800 text-slate-400 border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="pt-2">
          <CopyButton text={asset.agentPrompt} />
        </div>
      </div>
    </div>
  );
}
