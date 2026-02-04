"use client";

import { useState } from "react";
import { Maximize2, ExternalLink, RefreshCw } from "lucide-react";

interface LiveFrameProps {
  src: string;
  title: string;
}

export default function LiveFrame({ src, title }: LiveFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full bg-black flex flex-col font-mono text-xs border-technical shadow-2xl">
      <div className="h-10 bg-[#111] border-b border-[#333] flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          </div>
          <span className="ml-3 text-neutral-400 uppercase tracking-widest font-bold">
            {title}.HTML
          </span>
        </div>

        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors"
          title="Ouvrir dans un nouvel onglet"
        >
          <span className="hidden md:inline">PLEIN ÉCRAN</span>
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="relative flex-1 bg-white overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
            <div className="text-green-500 animate-pulse flex flex-col items-center gap-2">
              <RefreshCw className="animate-spin" />
              <span>CHARGEMENT DU MODULE...</span>
            </div>
          </div>
        )}

        <iframe
          src={src}
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
          title="Démonstration Interactive"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      <div className="h-8 bg-[#111] border-t border-[#333] flex items-center justify-between px-4 text-neutral-500">
        <span className="text-[10px]">MODE: INTERACTIVE SANDBOX</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-green-500">SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}