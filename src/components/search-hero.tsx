"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, Cpu, Zap, Brain } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useI18n } from '@/i18n/context';

interface GpuSuggestion {
  model: string;
  label: string;
  subtitle: string;
  icon: 'inference' | 'training' | 'general';
}

const GPU_SUGGESTIONS: GpuSuggestion[] = [
  { model: "Any", label: "All GPUs", subtitle: "Show all available models", icon: "general" },
  // NVIDIA H-series
  { model: "H100", label: "H100 80GB SXM", subtitle: "LLM Training · Top Tier", icon: "training" },
  { model: "H100", label: "H100 80GB PCIe", subtitle: "Fine-tuning · Inference", icon: "inference" },
  // NVIDIA A-series
  { model: "A100", label: "A100 80GB SXM", subtitle: "ML Training · Multi-node", icon: "training" },
  { model: "A100", label: "A100 80GB PCIe", subtitle: "Inference · Cost-efficient", icon: "inference" },
  { model: "A100", label: "A100 40GB", subtitle: "Fine-tuning · Budget", icon: "inference" },
  // NVIDIA L-series
  { model: "L40S", label: "L40S 48GB", subtitle: "Inference · Video AI", icon: "inference" },
  // NVIDIA V-series
  { model: "V100", label: "V100 32GB", subtitle: "Legacy ML · Budget", icon: "general" },
  // NVIDIA T-series
  { model: "T4", label: "T4 16GB", subtitle: "Inference · Lowest cost", icon: "inference" },
  // Consumer
  { model: "RTX 4090", label: "RTX 4090 24GB", subtitle: "Inference · Consumer-grade", icon: "inference" },
  { model: "RTX 6000 Ada", label: "RTX 6000 Ada 48GB", subtitle: "Professional · CAD/Render", icon: "general" },
  { model: "RTX A6000", label: "RTX A6000 48GB", subtitle: "Workstation · Versatile", icon: "general" },
  { model: "RTX 3090", label: "RTX 3090 24GB", subtitle: "Budget Training · Consumer", icon: "training" },
  { model: "RTX 3080", label: "RTX 3080 10GB", subtitle: "Entry-level · Spot", icon: "general" },
  // AMD
  { model: "MI300X", label: "MI300X 192GB", subtitle: "AMD AI · Massive VRAM", icon: "training" },
  { model: "MI250", label: "MI250 128GB", subtitle: "AMD HPC · Multi-die", icon: "training" },
  // Google TPU
  { model: "TPU v5e", label: "TPU v5e", subtitle: "Google AI · Efficient", icon: "training" },
  { model: "TPU v4", label: "TPU v4", subtitle: "Google AI · High-perf", icon: "training" },
];

const ICON_MAP = {
  inference: Zap,
  training: Brain,
  general: Cpu,
};

function GpuCombobox({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = GPU_SUGGESTIONS.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase()) ||
    s.model.toLowerCase().includes(query.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  // Deduplicate by model for display label
  const displayLabel = value === 'Any' ? t('search.allGpus') : value;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="bg-[#111] border border-[#222] rounded px-2.5 py-1.5 flex items-center justify-between w-[220px] cursor-text transition-colors hover:border-[#333] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/50"
        onClick={() => setIsOpen(true)}
      >
        {isOpen ? (
          <input
            autoFocus
            type="text"
            className="bg-transparent border-none text-sm text-white w-full focus:outline-none font-data"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : (
          <span className={`text-sm font-data truncate ${value === 'Any' ? 'text-white' : 'text-green-400 font-medium'}`}>
            {displayLabel}
          </span>
        )}
        <ChevronDown className="text-[#555] ml-2 shrink-0" size={12} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-[320px] max-h-72 overflow-y-auto bg-[#161616] border border-[#2a2a2a] rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
          {filtered.length === 0 ? (
            <div className="px-3 py-3 text-xs text-[#666]">{t('search.noModels')}</div>
          ) : (
            filtered.map((suggestion, idx) => {
              const IconComp = ICON_MAP[suggestion.icon];
              const isSelected = value === suggestion.model;
              return (
                <button
                  key={`${suggestion.model}-${idx}`}
                  className="w-full text-left px-3 py-2 hover:bg-[#222] flex items-center gap-3 group transition-colors"
                  onClick={() => {
                    onChange(suggestion.model);
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <div className="w-7 h-7 rounded bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 group-hover:border-[#444]">
                    <IconComp size={13} className="text-[#666] group-hover:text-[#999]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-data text-white truncate">
                      {suggestion.model === 'Any' ? t('search.allGpus') : suggestion.label}
                    </div>
                    <div className="text-[10px] text-[#555] truncate">{suggestion.subtitle}</div>
                  </div>
                  {isSelected && <Check size={14} className="text-green-500 flex-shrink-0" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

const CONTINENT_OPTIONS = [
  { value: "Any", label: "search.anyRegion" as const },
  { value: "North America", label: "region.northAmerica" as const },
  { value: "Europe", label: "region.europe" as const },
  { value: "Asia Pacific", label: "region.asiaPacific" as const },
  { value: "Global", label: "region.global" as const },
];

export function SearchBar() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGpu, setSelectedGpu] = useState(searchParams.get('model') || "Any");
  const [quantity, setQuantity] = useState("8x");
  const [vram, setVram] = useState(searchParams.get('min_vram') || "Any");
  const [continent, setContinent] = useState(searchParams.get('continent') || "Any");

  useEffect(() => {
    setSelectedGpu(searchParams.get('model') || "Any");
    setVram(searchParams.get('min_vram') || "Any");
    setContinent(searchParams.get('continent') || "Any");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedGpu && selectedGpu !== "Any") params.set('model', selectedGpu);
    else params.delete('model');
    if (vram && vram !== "Any") params.set('min_vram', vram);
    else params.delete('min_vram');
    if (continent && continent !== "Any") params.set('continent', continent);
    else params.delete('continent');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const selectClass = "bg-[#111] border border-[#222] rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-[#444] hover:border-[#333] transition-colors cursor-pointer appearance-none font-data";

  return (
    <div className="border-b border-[#1a1a1a] bg-[#0d0d0d]">
      <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-3 flex-wrap">

        <span className="text-xs font-medium text-[#555] uppercase tracking-wider mr-1">{t('search.label')}</span>

        <GpuCombobox value={selectedGpu} onChange={setSelectedGpu} />

        <div className="relative">
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)} className={selectClass}>
            {["1x", "2x", "4x", "8x"].map(q => <option key={q} value={q}>{q}</option>)}
          </select>
          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" size={12} />
        </div>

        <div className="relative">
          <select value={vram} onChange={(e) => setVram(e.target.value)} className={selectClass}>
            {["Any", "16GB", "24GB", "40GB", "48GB", "80GB", "128GB"].map(v => <option key={v} value={v}>{v === "Any" ? t('search.anyVram') : `≥ ${v}`}</option>)}
          </select>
          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" size={12} />
        </div>

        <div className="relative">
          <select value={continent} onChange={(e) => setContinent(e.target.value)} className={selectClass}>
            {CONTINENT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" size={12} />
        </div>

        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-500 text-black text-sm font-semibold px-4 py-1.5 rounded flex items-center gap-1.5 transition-colors active:scale-[0.97]"
        >
          <Search size={13} strokeWidth={2.5} />
          {t('search.button')}
        </button>

        <div className="ml-auto text-xs text-[#444] hidden md:block font-data">
          {t('search.stats')}
        </div>
      </div>
    </div>
  );
}
