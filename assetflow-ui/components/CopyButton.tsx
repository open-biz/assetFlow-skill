"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "primary" | "minimal" | "large";
}

export default function CopyButton({ text, label = "Copy Agent Prompt", variant = "primary" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [text]);

  if (variant === "minimal") {
    return (
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-800/60 hover:bg-slate-700/80 hover:text-white rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
        title="Copy to clipboard"
      >
        {copied ? (
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
    );
  }

  if (variant === "large") {
    return (
      <button
        onClick={handleCopy}
        className="group inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/20 hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <Terminal className="w-4 h-4 text-cyan-200 group-hover:text-white transition-colors" />
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-100">Copied to clipboard!</span>
          </>
        ) : (
          <>
            <span>{label}</span>
            <Copy className="w-4 h-4 text-cyan-300 group-hover:text-white transition-colors" />
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-cyan-50 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98] w-full justify-center"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
