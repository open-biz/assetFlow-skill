"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, RotateCcw } from "lucide-react";

interface Line {
  id: number;
  type: "command" | "output" | "success" | "error" | "info";
  text: string;
  delay: number;
}

const DEMO_LINES: Line[] = [
  { id: 1, type: "command", text: "node scripts/list_local_assets.js", delay: 0 },
  { id: 2, type: "output", text: '["raw_demo.mp4", "loom_2024.mp4", "logo.png"]', delay: 400 },
  { id: 3, type: "info", text: "---", delay: 200 },
  { id: 4, type: "command", text: 'node scripts/generate_avatar.js "Welcome to AssetFlow" intro.mp4', delay: 300 },
  { id: 5, type: "info", text: "[AssetFlow] Generating HeyGen Avatar video...", delay: 400 },
  { id: 6, type: "info", text: "[AssetFlow] Polling for completion...", delay: 600 },
  { id: 7, type: "info", text: "[AssetFlow] Status: completed", delay: 800 },
  { id: 8, type: "success", text: "✅ SUCCESS: Avatar video saved.", delay: 400 },
  { id: 9, type: "info", text: 'AGENT INSTRUCTION: Use <video src="assets/intro.mp4"></video>', delay: 200 },
  { id: 10, type: "info", text: "---", delay: 200 },
  { id: 11, type: "command", text: "node scripts/get_media_duration.js intro.mp4", delay: 300 },
  { id: 12, type: "output", text: "5.23", delay: 400 },
  { id: 13, type: "info", text: "---", delay: 200 },
  { id: 14, type: "command", text: "node scripts/smart_trim.js raw_demo.mp4 00:00:45 10 feature.mp4", delay: 300 },
  { id: 15, type: "info", text: "[AssetFlow] Agent requested trim: raw_demo.mp4 from 00:00:45 for 10s", delay: 400 },
  { id: 16, type: "info", text: "[AssetFlow] Running FFmpeg...", delay: 600 },
  { id: 17, type: "success", text: "✅ SUCCESS: Video trimmed.", delay: 400 },
  { id: 18, type: "info", text: 'AGENT INSTRUCTION: Use <video src="assets/feature.mp4"></video>', delay: 200 },
  { id: 19, type: "info", text: "---", delay: 200 },
  { id: 20, type: "command", text: "node scripts/normalize_video.js feature.mp4 feature_final.mp4", delay: 300 },
  { id: 21, type: "info", text: "[AssetFlow] Normalizing to 1080p60 H.264...", delay: 400 },
  { id: 22, type: "success", text: "✅ SUCCESS: Video normalized.", delay: 600 },
  { id: 23, type: "info", text: "---", delay: 200 },
  { id: 24, type: "command", text: "node scripts/get_media_duration.js feature_final.mp4", delay: 300 },
  { id: 25, type: "output", text: "10.00", delay: 400 },
];

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isPlaying || lineIndex >= DEMO_LINES.length) return;
    if (!hasStarted.current) {
      hasStarted.current = true;
    }

    const line = DEMO_LINES[lineIndex];
    const timeout = setTimeout(() => {
      setVisibleLines((prev) => [...prev, line]);
      setLineIndex((prev) => prev + 1);
    }, line.delay);

    return () => clearTimeout(timeout);
  }, [lineIndex, isPlaying]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const handleReset = () => {
    setVisibleLines([]);
    setLineIndex(0);
    setIsPlaying(true);
    hasStarted.current = false;
  };

  const handleToggle = () => {
    if (lineIndex >= DEMO_LINES.length) {
      handleReset();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Terminal Window */}
      <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#080c14] shadow-2xl shadow-cyan-900/10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-700/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-slate-500 font-medium ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              assetflow-skill — zsh
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
              title="Restart demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleToggle}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              <Play className={`w-3.5 h-3.5 ${isPlaying && lineIndex < DEMO_LINES.length ? "text-cyan-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          ref={scrollRef}
          className="h-[400px] overflow-y-auto px-4 py-4 font-mono text-sm space-y-1"
        >
          {visibleLines.length === 0 && (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-cyan-500">$</span>
              <span className="cursor-blink inline-block w-2 h-4 bg-cyan-500/60" />
            </div>
          )}
          {visibleLines.map((line) => (
            <div
              key={line.id}
              className={`flex items-start gap-2 animate-fade-in ${
                line.type === "command"
                  ? "text-cyan-300"
                  : line.type === "success"
                  ? "text-emerald-400"
                  : line.type === "error"
                  ? "text-rose-400"
                  : line.type === "output"
                  ? "text-slate-300 font-semibold"
                  : "text-slate-500"
              }`}
            >
              {line.type === "command" && (
                <span className="text-cyan-500 shrink-0 select-none">$</span>
              )}
              {line.type !== "command" && (
                <span className="w-4 shrink-0" />
              )}
              <span className="break-all">{line.text}</span>
            </div>
          ))}
          {lineIndex < DEMO_LINES.length && visibleLines.length > 0 && (
            <div className="flex items-center gap-2 text-slate-600 animate-fade-in">
              <span className="text-cyan-500">$</span>
              <span className="cursor-blink inline-block w-2 h-4 bg-cyan-500/60" />
            </div>
          )}
          {lineIndex >= DEMO_LINES.length && visibleLines.length > 0 && (
            <div className="flex items-center gap-2 text-emerald-500/60 mt-4">
              <span className="w-4" />
              <span>Done. Agent now writes perfect Hyperframes HTML.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
