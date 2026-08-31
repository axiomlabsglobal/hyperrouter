"use client";

import React, { useCallback, useMemo, useState } from 'react';
import { ExternalLink, Info, ShieldCheck, AlertTriangle, Megaphone, Star, Zap, Shield, Scan } from 'lucide-react';
import { GPUInstance } from '@/types/gpu';
import { ComplianceModal } from './compliance-modal';
import { RedirectModal } from './redirect-modal';
import { useI18n } from '@/i18n/context';

function buildAffiliateUrl(baseUrl: string, tag: string): string {
  try {
    const url = new URL(baseUrl);
    if (url.searchParams.has('ref')) {
      url.searchParams.set('ref', tag);
    } else {
      url.searchParams.set('utm_source', 'hyperrouter');
      url.searchParams.set('utm_medium', 'referral');
      url.searchParams.set('ref', tag);
    }
    url.searchParams.set('click_id', crypto.randomUUID());
    return url.toString();
  } catch {
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}ref=${tag}`;
  }
}

function MicroBadge({ text }: { text: string }) {
  const lower = text.toLowerCase();
  const isWarning = lower.includes('community') || lower.includes('risk') || lower.includes('no sla');
  const isCert = lower.includes('soc') || lower.includes('hipaa') || lower.includes('iso') || lower.includes('fedramp') || lower.includes('gdpr');

  if (isWarning) {
    return <span className="text-[9px] font-medium px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/15 inline-flex items-center gap-0.5"><AlertTriangle size={8} />{text}</span>;
  }
  if (isCert) {
    return <span className="text-[9px] font-medium px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/15 inline-flex items-center gap-0.5"><ShieldCheck size={8} />{text}</span>;
  }
  return <span className="text-[9px] font-medium px-2 py-0.5 bg-white/5 text-[#666] rounded-full border border-white/8">{text}</span>;
}

function SlaCell({ sla }: { sla: string }) {
  if (sla === '99.99%') return <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-data">99.99%</span>;
  if (sla === '99.9%') return <span className="text-[10px] font-semibold px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded-full font-data">99.9%</span>;
  return <span className="text-[10px] font-semibold px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full font-data">None</span>;
}

// ─── Auto-Scoring Badge ───
type BadgeType = 'value' | 'performance' | 'reliability' | null;

function ScoreBadge({ type }: { type: BadgeType }) {
  if (!type) return null;
  const config = {
    value: { icon: Star, label: "Best Value", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    performance: { icon: Zap, label: "Best Perf", bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
    reliability: { icon: Shield, label: "Reliable", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  }[type];
  const Icon = config.icon;
  return (
    <span className={`text-[8px] font-bold px-1 py-px rounded-sm border inline-flex items-center gap-0.5 ${config.bg} ${config.text} ${config.border}`}>
      <Icon size={7} />
      {config.label}
    </span>
  );
}

// ─── AR-Style Data Overlay ───
function DataOverlay({ gpu }: { gpu: GPUInstance }) {
  const spotRisk = gpu.availability === 'Spot'
    ? `${Math.floor(gpu.price * 7 % 25) + 5}% RISK`
    : 'N/A — ON-DEMAND';
  const complianceStatus = gpu.compliance.length > 0
    ? gpu.compliance.slice(0, 2).join(' · ')
    : 'UNCERTIFIED';

  return (
    <div className="ar-tooltip absolute z-50 left-0 right-0 top-full rounded-md p-3 shadow-2xl pointer-events-none overflow-hidden">
      <div className="ar-tooltip-corner ar-tooltip-corner-tl" />
      <div className="ar-tooltip-corner ar-tooltip-corner-tr" />
      <div className="ar-tooltip-corner ar-tooltip-corner-bl" />
      <div className="ar-tooltip-corner ar-tooltip-corner-br" />
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold text-[#444] uppercase tracking-[0.1em] font-data">SPOT INTERRUPT</span>
          <span className={`text-xs font-bold font-data ${gpu.availability === 'Spot' ? 'text-amber-400' : 'text-emerald-500'}`}>{spotRisk}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold text-[#444] uppercase tracking-[0.1em] font-data">COMPLIANCE</span>
          <span className="text-xs font-data text-[#888]">{complianceStatus}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold text-[#444] uppercase tracking-[0.1em] font-data">FALLBACK NODES</span>
          <span className={`text-xs font-bold font-data ${gpu.alternativeCount > 5 ? 'text-emerald-500' : gpu.alternativeCount > 0 ? 'text-sky-400' : 'text-red-400'}`}>{gpu.alternativeCount} AVAILABLE</span>
        </div>
      </div>
      <div className="mt-2 h-px bg-gradient-to-r from-transparent via-[#00FF66]/20 to-transparent" />
      <div className="mt-1 flex items-center gap-1.5">
        <Scan size={9} className="text-[#333]" />
        <span className="text-[8px] text-[#333] font-data uppercase tracking-widest">HyperRouter Telemetry v2.1</span>
      </div>
    </div>
  );
}

function ContingencyCell({ count, gpuName }: { count: number; gpuName: string }) {
  const [visible, setVisible] = useState(false);
  const model = gpuName.replace(/^\d+x\s*/, '').split(' —')[0].split(' (')[0].trim();

  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <button className="text-[#444] hover:text-[#888] transition-colors">
        <Info size={13} />
      </button>
      {visible && (
        <div className="absolute z-50 right-0 top-full mt-1 w-52 bg-[#161616] border border-[#2a2a2a] rounded-md p-2.5 shadow-xl text-[11px] text-[#999] leading-relaxed pointer-events-none">
          <span className="text-white font-semibold">{count}</span> similar <span className="text-white">{model}</span> instances across other regions.
        </div>
      )}
    </div>
  );
}

// ─── TCO Real Cost calculation (simple weighted estimate) ───
function computeRealCost(basePrice: number): number {
  // Add estimated network egress (~8%) + storage (~15%) overhead
  return Math.round(basePrice * 1.23 * 100) / 100;
}

interface GPURowProps {
  gpu: GPUInstance;
  isBestPrice?: boolean;
  showRealCost?: boolean;
  badge?: BadgeType;
}

export function GPURow({ gpu, isBestPrice = false, showRealCost = false, badge = null }: GPURowProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectOpen, setRedirectOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { t } = useI18n();

  const affiliateUrl = useMemo(
    () => buildAffiliateUrl(gpu.affiliateLink, gpu.affiliateTag),
    [gpu.affiliateLink, gpu.affiliateTag],
  );

  const handleConfirm = () => {
    setModalOpen(false);
    setRedirectOpen(true);
  };

  const handleRedirect = useCallback(() => {
    setRedirectOpen(false);
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  }, [affiliateUrl]);

  const rowBg = gpu.promoted
    ? 'bg-amber-500/[0.03] hover:bg-[#1a1a1a] border-l-2 border-l-amber-500/40'
    : 'hover:bg-[#1a1a1a] border-l-2 border-l-transparent hover:border-l-green-500';

  const priceClass = isBestPrice
    ? 'price-best font-bold font-data tabular-nums text-sm'
    : 'text-white font-bold font-data tabular-nums text-sm';

  const displayPrice = showRealCost ? computeRealCost(gpu.price) : gpu.price;

  return (
    <>
      <tr
        className={`border-b border-[#1a1a1a] text-sm transition-all duration-200 ${rowBg} group relative`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Provider */}
        <td className="py-2.5 px-3 whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-medium text-[13px]">{gpu.provider}</span>
            {gpu.promoted && (
              <span className="text-[9px] font-bold px-1 py-px bg-amber-500/10 text-amber-500 rounded-sm border border-amber-500/15 inline-flex items-center gap-0.5">
                <Megaphone size={8} />{t('gpu.ad')}
              </span>
            )}
            <ScoreBadge type={badge} />
          </div>
        </td>

        {/* GPU Spec */}
        <td className="py-2.5 px-3 whitespace-nowrap">
          <span className="text-white font-medium font-data text-[13px]">{gpu.gpuName}</span>
        </td>

        {/* VRAM */}
        <td className="py-2.5 px-3 whitespace-nowrap font-data tabular-nums text-[#888] text-xs">
          {gpu.vram}
        </td>

        {/* Location */}
        <td className="py-2.5 px-3 whitespace-nowrap text-[#666] text-xs">
          {gpu.region}
        </td>

        {/* Availability */}
        <td className="py-2.5 px-3 whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${gpu.availability === 'Spot' ? 'bg-amber-400' : 'bg-emerald-500'}`} />
            <span className="text-[#888] text-xs">{gpu.availability}</span>
          </div>
        </td>

        {/* SLA */}
        <td className="py-2.5 px-3 whitespace-nowrap">
          <SlaCell sla={gpu.sla} />
        </td>

        {/* Compliance */}
        <td className="py-2.5 px-3">
          <div className="flex items-center gap-1 flex-wrap max-w-[180px]">
            {gpu.compliance.slice(0, 3).map(c => <MicroBadge key={c} text={c} />)}
            {gpu.compliance.length > 3 && <span className="text-[9px] text-[#555]">+{gpu.compliance.length - 3}</span>}
          </div>
        </td>

        {/* Price — F1 Telemetry + Real Cost */}
        <td className="py-2.5 px-3 whitespace-nowrap text-right">
          <div className="flex flex-col items-end">
            <div>
              <span className={priceClass}>${displayPrice.toFixed(2)}</span>
              <span className="text-[#555] text-[11px] ml-0.5">/hr</span>
            </div>
            {showRealCost && (
              <span className="text-[9px] text-[#444] font-data">(+ Est. Network & Storage)</span>
            )}
          </div>
        </td>

        {/* Action */}
        <td className="py-2.5 px-3 whitespace-nowrap text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <ContingencyCell count={gpu.alternativeCount} gpuName={gpu.gpuName} />
            <button
              onClick={() => setModalOpen(true)}
              className="opacity-50 group-hover:opacity-100 bg-[#1a1a1a] group-hover:bg-green-600 text-[#555] group-hover:text-black border border-[#2a2a2a] group-hover:border-green-500 group-hover:shadow-[0_0_12px_rgba(34,197,94,0.4)] px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all duration-300 active:scale-[0.97]"
            >
              {t('gpu.rent')} <ExternalLink size={10} />
            </button>
          </div>
        </td>

        {/* AR Tooltip Overlay */}
        {hovered && (
          <td className="absolute left-0 right-0 top-full" style={{ padding: 0, border: 'none' }}>
            <DataOverlay gpu={gpu} />
          </td>
        )}
      </tr>

      <ComplianceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        providerName={gpu.provider}
      />

      <RedirectModal
        isOpen={redirectOpen}
        onClose={() => setRedirectOpen(false)}
        onRedirect={handleRedirect}
        providerName={gpu.provider}
        providerUrl={affiliateUrl}
      />
    </>
  );
}
