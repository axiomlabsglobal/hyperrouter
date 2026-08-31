"use client";

import React, { useState } from 'react';
import { SlidersHorizontal, Check, ChevronDown, ChevronRight, ShieldCheck, Building, Clock } from 'lucide-react';
import { AlertCreatorButton } from './alert-creator';
import { useI18n } from '@/i18n/context';
import type { FilterState } from '@/app/page';

interface ProviderGroup {
  label: string;
  providers: string[];
}

const PROVIDER_GROUPS: ProviderGroup[] = [
  { label: "Hyperscalers", providers: ["AWS", "Google Cloud", "Microsoft Azure", "Oracle Cloud", "IBM Cloud"] },
  { label: "Specialized", providers: ["CoreWeave", "Lambda", "RunPod", "Paperspace", "FluidStack", "TensorDock", "Genesis Cloud", "Cudo Compute", "Scaleway", "OVHcloud", "Linode (Akamai)", "Vultr", "Crusoe Energy", "Nebius"] },
  { label: "Decentralized", providers: ["Vast.ai", "Salad", "Akash Network"] },
];

const COMPLIANCE_OPTIONS = ["SOC 2 Type II", "HIPAA", "GDPR", "ISO 27001"];
const INFRA_OPTIONS = ["Tier 3/4 Data Center", "Standard Data Center", "Community / Peer-to-Peer"];
const SLA_OPTIONS = ["99.99%", "99.9%", "Best Effort"];
const REGION_OPTIONS = ["North America", "Europe", "Asia Pacific", "Global"];

export function FilterSidebar({ filters, setFilters }: { filters: FilterState, setFilters: React.Dispatch<React.SetStateAction<FilterState>> }) {
  const { t } = useI18n();
  
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Hyperscalers": true, "Specialized": true, "Decentralized": false,
  });

  const toggleSpot = () => setFilters(prev => ({ ...prev, spot: !prev.spot }));
  
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, max_price: e.target.value }));

  const toggleProvider = (p: string) => {
    setFilters(prev => {
      const np = prev.providers.includes(p) ? prev.providers.filter(x => x !== p) : [...prev.providers, p];
      return { ...prev, providers: np };
    });
  };

  const toggleGroup = (l: string) => setExpandedGroups(p => ({ ...p, [l]: !p[l] }));
  
  const toggleAllInGroup = (g: ProviderGroup) => {
    setFilters(prev => {
      const all = g.providers.every(p => prev.providers.includes(p));
      const np = all 
        ? prev.providers.filter(p => !g.providers.includes(p)) 
        : Array.from(new Set([...prev.providers, ...g.providers]));
      return { ...prev, providers: np };
    });
  };

  const toggleArr = (key: keyof FilterState, val: string) => {
    setFilters(prev => {
      const arr = prev[key] as string[];
      const newArr = arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
      return { ...prev, [key]: newArr };
    });
  };

  return (
    <aside className="w-56 flex-shrink-0 hidden lg:flex flex-col gap-4 text-xs sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto pb-10 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      
      {/* Alert CTA */}
      <AlertCreatorButton />

      {/* Spot toggle */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">{t('filter.availability')}</span>
        <label className="flex items-center justify-between cursor-pointer group" onClick={toggleSpot}>
          <span className="text-[#999] group-hover:text-white transition-colors">{t('filter.includeSpot')}</span>
          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${filters.spot ? 'bg-green-600' : 'bg-[#222]'}`}>
            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${filters.spot ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </label>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">{t('filter.maxPrice')}</span>
        <input type="range" min="0" max="50" value={filters.max_price} onChange={handlePrice} className="w-full" />
        <div className="flex justify-between text-[10px] text-[#555]">
          <span>$0</span>
          <span className="text-green-500 font-data font-semibold">${filters.max_price}{filters.max_price === "50" ? "+" : ""}</span>
        </div>
      </div>

      {/* Divider: Global Regions */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-[#1e1e1e]" />
        <span className="text-[9px] font-bold text-[#444] uppercase tracking-widest">{t('filter.globalRegions')}</span>
        <div className="h-px flex-1 bg-[#1e1e1e]" />
      </div>

      {/* Continent / Region Filter */}
      <FilterSection 
        icon={<Building size={11} className="text-blue-400" />} 
        title={t('filter.region')} 
        items={REGION_OPTIONS} 
        selected={filters.continent}
        onToggle={(c) => toggleArr('continent', c)} 
        color="blue" 
      />

      {/* Divider: Enterprise */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-[#1e1e1e]" />
        <span className="text-[9px] font-bold text-[#444] uppercase tracking-widest">{t('filter.enterprise')}</span>
        <div className="h-px flex-1 bg-[#1e1e1e]" />
      </div>

      {/* Compliance */}
      <FilterSection icon={<ShieldCheck size={11} className="text-emerald-500" />} title={t('filter.compliance')} items={COMPLIANCE_OPTIONS} selected={filters.compliance}
        onToggle={(c) => toggleArr('compliance', c)} color="emerald" />

      {/* Infra */}
      <FilterSection icon={<Building size={11} className="text-sky-400" />} title={t('filter.infraTier')} items={INFRA_OPTIONS} selected={filters.infra}
        onToggle={(c) => toggleArr('infra', c)} color="sky" />

      {/* SLA */}
      <FilterSection icon={<Clock size={11} className="text-violet-400" />} title={t('filter.sla')} items={SLA_OPTIONS} selected={filters.sla}
        onToggle={(c) => toggleArr('sla', c)} color="violet"
        labelMap={{ "Best Effort": "No SLA", "99.99%": "99.99% Uptime", "99.9%": "99.9% Uptime" }} />

      {/* Divider: Providers */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-[#1e1e1e]" />
        <span className="text-[9px] font-bold text-[#444] uppercase tracking-widest">{t('filter.providers')}</span>
        <div className="h-px flex-1 bg-[#1e1e1e]" />
      </div>

      {/* Provider groups */}
      {PROVIDER_GROUPS.map((group) => {
        const isExpanded = expandedGroups[group.label];
        const count = group.providers.filter(p => filters.providers.includes(p)).length;
        const allSel = count === group.providers.length;
        return (
          <div key={group.label} className="flex flex-col">
            <button onClick={() => toggleGroup(group.label)} className="flex items-center justify-between py-1 group cursor-pointer">
              <div className="flex items-center gap-1.5">
                {isExpanded ? <ChevronDown size={11} className="text-[#555]" /> : <ChevronRight size={11} className="text-[#555]" />}
                <span className="text-[#999] font-medium group-hover:text-white transition-colors">{group.label}</span>
              </div>
              {count > 0 && <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-1 py-px rounded-sm">{count}</span>}
            </button>
            {isExpanded && (
              <div className="flex flex-col gap-0.5 pl-5 mt-0.5">
                <label className="flex items-center gap-2 cursor-pointer group py-0.5" onClick={(e) => { e.preventDefault(); toggleAllInGroup(group); }}>
                  <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all ${allSel ? 'bg-green-600 border-green-600' : 'bg-[#111] border-[#333] group-hover:border-[#555]'}`}>
                    {allSel && <Check size={9} className="text-black" strokeWidth={3} />}
                  </div>
                  <span className="text-[#666] italic">All</span>
                </label>
                {group.providers.map(p => {
                  const active = filters.providers.includes(p);
                  return (
                    <label key={p} className="flex items-center gap-2 cursor-pointer group py-0.5" onClick={(e) => { e.preventDefault(); toggleProvider(p); }}>
                      <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all ${active ? 'bg-green-600 border-green-600' : 'bg-[#111] border-[#333] group-hover:border-[#555]'}`}>
                        {active && <Check size={9} className="text-black" strokeWidth={3} />}
                      </div>
                      <span className={`transition-colors ${active ? 'text-white' : 'text-[#888] group-hover:text-[#ccc]'}`}>{p}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

// ─── Reusable Filter Section ───
function FilterSection({ icon, title, items, selected, onToggle, color, labelMap }: {
  icon: React.ReactNode; title: string; items: string[]; selected: string[];
  onToggle: (item: string) => void; color: string; labelMap?: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">{title}</span>
        {selected.length > 0 && (
          <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full ml-auto">{selected.length}</span>
        )}
      </div>
      <div className="flex flex-col gap-0.5 pl-0.5">
        {items.map(item => {
          const active = selected.includes(item);
          return (
            <label key={item} className="flex items-center gap-2 cursor-pointer group py-0.5" onClick={(e) => { e.preventDefault(); onToggle(item); }}>
              <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all flex-shrink-0 ${active ? 'bg-' + color + '-500 border-' + color + '-500' : 'bg-[#111] border-[#333] group-hover:border-[#555]'}`}>
                {active && <Check size={9} className={color === 'violet' ? 'text-white' : 'text-black'} strokeWidth={3} />}
              </div>
              <span className={`transition-colors ${active ? 'text-white' : 'text-[#888] group-hover:text-[#ccc]'}`}>
                {labelMap?.[item] || item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
