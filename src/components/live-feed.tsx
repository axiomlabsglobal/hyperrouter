"use client";

import React, { useState, useEffect, useRef } from 'react';

interface FeedEvent {
  id: number;
  text: string;
  time: string;
}

const GPU_MODELS = ["8x A100 80GB", "4x H100 SXM", "1x RTX 4090", "2x L40S 48GB", "8x H100 PCIe", "4x A100 40GB", "1x MI300X 192GB", "2x RTX 6000 Ada", "8x H200 141GB", "1x B200 192GB"];
const PROVIDERS = ["RunPod", "Vast.ai", "Lambda", "CoreWeave", "AWS", "GCP", "Azure", "TensorDock", "Paperspace", "FluidStack", "Scaleway", "OVHcloud", "Nebius"];
const ACTIONS = ["deployed", "provisioned", "scaled up", "reserved", "spot-claimed"];
const REGIONS = ["🇺🇸 US-East", "🇪🇺 EU-West", "🇯🇵 JP-Tokyo", "🇩🇪 DE-Frankfurt", "🇸🇬 SG-Singapore", "🇺🇸 US-West", "🇰🇷 KR-Seoul", "🇫🇷 FR-Paris"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEvent(id: number): FeedEvent {
  const secsAgo = Math.floor(Math.random() * 45) + 3;
  return {
    id,
    text: `${randomItem(GPU_MODELS)} ${randomItem(ACTIONS)} on ${randomItem(PROVIDERS)} ${randomItem(REGIONS)}`,
    time: `${secsAgo}s ago`,
  };
}

export function LiveFeed() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [mounted, setMounted] = useState(false);
  const counterRef = useRef(0);

  // Only generate random events on client after mount to avoid hydration mismatch
  useEffect(() => {
    const initial: FeedEvent[] = [];
    for (let i = 0; i < 4; i++) {
      initial.push(generateEvent(counterRef.current++));
    }
    setEvents(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      const newEvent = generateEvent(counterRef.current++);
      setEvents(prev => [newEvent, ...prev].slice(0, 6));
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-72 pointer-events-none hidden xl:block">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[9px] font-bold text-[#444] uppercase tracking-widest font-data">Live Feed</span>
      </div>

      {/* Feed Container */}
      <div className="feed-container flex flex-col gap-1 max-h-48 overflow-hidden">
        {events.map((event) => (
          <div
            key={event.id}
            className="feed-item bg-[#0c0c0c]/80 border border-[#1a1a1a] rounded px-2.5 py-1.5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-2">
              <span className="text-[9px] text-[#444] font-data whitespace-nowrap mt-px">[{event.time}]</span>
              <span className="text-[10px] text-[#888] font-data leading-relaxed">{event.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
