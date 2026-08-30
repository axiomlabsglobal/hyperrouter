"use client";

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GPURow } from './gpu-card';
import { SkeletonCard } from './skeleton-card';
import { getGlobalInstances } from '@/lib/mock-data';
import { useI18n } from '@/i18n/context';
import { ChevronLeft, ChevronRight, DollarSign, Info, SearchX } from 'lucide-react';

type BadgeType = 'value' | 'performance' | 'reliability' | null;

// High-performance GPU architectures
const PERF_GPUS = ['H100', 'H200', 'B200', 'MI300X', 'TPU v5e'];

export function ResultsList() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [showRealCost, setShowRealCost] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  
  const PAGE_SIZE = 20;

  // Hydration fix
  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  // ─── Reset page to 1 when search parameters change ───
  const queryString = searchParams.toString();
  const prevQuery = React.useRef(queryString);
  useEffect(() => {
    if (prevQuery.current !== queryString) {
      setPage(1);
      prevQuery.current = queryString;
    }
  }, [queryString]);

  // ─── Fetch Full Mock Data ───
  const allInstances = useMemo(() => getGlobalInstances(), []);
  
  // ─── Extract Params ───
  const gpuModel = searchParams.get('model');
  const quantity = searchParams.get('quantity');
  const maxPrice = searchParams.get('max_price');
  const spotEnabled = searchParams.get('spot') === 'true';
  const providers = searchParams.get('providers')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
  const complianceFilter = searchParams.get('compliance')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
  const infraFilter = searchParams.get('infra')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
  const slaFilter = searchParams.get('sla')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
  
  const rawContinent = searchParams.get('continent') || searchParams.get('region') || '';
  const continentList = rawContinent
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => s && s !== 'any' && s !== 'all');

  const minVram = searchParams.get('min_vram') || searchParams.get('vram');

  // ─── Client-Side Filtering (useMemo) ───
  const filteredData = useMemo(() => {
    let filtered = [...allInstances];

    // 1. GPU Model Filter
    if (gpuModel && gpuModel.toLowerCase() !== 'any') {
      const modelLower = gpuModel.toLowerCase();
      filtered = filtered.filter(gpu => gpu.gpuName.toLowerCase().includes(modelLower));
    }

    // 2. Quantity Filter
    if (quantity && quantity.toLowerCase() !== 'any') {
      const qLower = quantity.toLowerCase().replace(/[^0-9x]/g, '');
      filtered = filtered.filter(gpu => {
        const nameLower = gpu.gpuName.toLowerCase();
        return nameLower.startsWith(`${qLower} `) || nameLower.startsWith(`${qLower}-`) || nameLower.includes(`${qLower} `);
      });
    }

    // 3. Provider Filter (OR condition within providers)
    if (providers.length > 0) {
      filtered = filtered.filter(gpu =>
        providers.some(p => gpu.provider.toLowerCase() === p || gpu.provider.toLowerCase().includes(p))
      );
    }

    // 4. Spot / On-Demand
    if (!spotEnabled) {
      filtered = filtered.filter(gpu => gpu.availability === 'On-Demand');
    }

    // 5. Max Price
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter(gpu => gpu.price <= max);
      }
    }

    // 6. Min VRAM
    if (minVram && minVram.toLowerCase() !== 'any') {
      const vramNum = parseInt(minVram.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(vramNum)) {
        filtered = filtered.filter(gpu => {
          const gpuVram = parseInt(gpu.vram.replace(/[^0-9]/g, ''), 10);
          return !isNaN(gpuVram) && gpuVram >= vramNum;
        });
      }
    }

    // 7. Continent & Region
    if (continentList.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuContinent = (gpu.continent || '').toLowerCase();
        const gpuRegion = (gpu.region || '').toLowerCase();
        
        return continentList.some(target => {
          if (gpuContinent === target || gpuContinent.includes(target) || target.includes(gpuContinent)) return true;
          if (gpuRegion.includes(target)) return true;
          if ((target === 'eu' || target === 'europe') && (gpuContinent === 'europe' || gpuRegion.includes('eu-') || gpuRegion.includes('europe'))) return true;
          if ((target === 'na' || target === 'us' || target === 'north america') && (gpuContinent === 'north america' || gpuRegion.includes('us-') || gpuRegion.includes('canada'))) return true;
          if ((target === 'ap' || target === 'asia' || target === 'asia pacific') && (gpuContinent === 'asia pacific' || gpuRegion.includes('ap-') || gpuRegion.includes('tokyo') || gpuRegion.includes('seoul') || gpuRegion.includes('singapore'))) return true;
          return false;
        });
      });
    }

    // 8. Compliance (AND condition: instance must have all selected compliances)
    if (complianceFilter.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuComp = (gpu.compliance || []).map(c => c.toLowerCase());
        return complianceFilter.every(c => gpuComp.some(gc => gc.includes(c) || c.includes(gc)));
      });
    }

    // 9. Infrastructure Tier
    if (infraFilter.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuInfra = (gpu.infrastructureTier || '').toLowerCase();
        return infraFilter.some(i => gpuInfra.includes(i) || i.includes(gpuInfra));
      });
    }

    // 10. SLA
    if (slaFilter.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuSla = (gpu.sla || '').toLowerCase();
        return slaFilter.some(s => gpuSla.includes(s) || s.includes(gpuSla));
      });
    }

    // Sort: Promoted first, then price ascending
    filtered.sort((a, b) => {
      if (a.promoted && !b.promoted) return -1;
      if (!a.promoted && b.promoted) return 1;
      return a.price - b.price;
    });

    return filtered;
  }, [allInstances, gpuModel, quantity, maxPrice, spotEnabled, providers, complianceFilter, infraFilter, slaFilter, continentList, minVram]);

  // ─── Pagination ───
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  
  // Ensure current page is within bounds
  const validPage = Math.min(page, totalPages);
  
  const paginatedData = useMemo(() => {
    const startIndex = (validPage - 1) * PAGE_SIZE;
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredData, validPage, PAGE_SIZE]);

  // Global meta logic
  const uniqueProviders = useMemo(() => new Set(allInstances.map(g => g.provider)).size, [allInstances]);

  // ─── Auto-Scoring: compute badges ───
  const badgeMap = useMemo(() => {
    const map = new Map<string, BadgeType>();
    if (paginatedData.length === 0) return map;

    // Best Value: lowest price-per-GB-VRAM (non-promoted)
    let bestValueId: string | null = null;
    let bestValueRatio = Infinity;
    paginatedData.forEach(g => {
      if (g.promoted) return;
      const vramNum = parseInt(g.vram, 10);
      if (isNaN(vramNum) || vramNum === 0) return;
      const ratio = g.price / vramNum;
      if (ratio < bestValueRatio) {
        bestValueRatio = ratio;
        bestValueId = g.id;
      }
    });
    if (bestValueId) map.set(bestValueId, 'value');

    // Best Performance
    let bestPerfId: string | null = null;
    let bestPerfPrice = Infinity;
    paginatedData.forEach(g => {
      if (g.promoted || map.has(g.id)) return;
      const isHighPerf = PERF_GPUS.some(p => g.gpuName.includes(p));
      if (isHighPerf && g.price < bestPerfPrice) {
        bestPerfPrice = g.price;
        bestPerfId = g.id;
      }
    });
    if (bestPerfId) map.set(bestPerfId, 'performance');

    // Best Reliability
    let bestRelId: string | null = null;
    let bestRelPrice = Infinity;
    paginatedData.forEach(g => {
      if (g.promoted || map.has(g.id)) return;
      if (g.sla === '99.99%' && g.compliance.length >= 2 && g.price < bestRelPrice) {
        bestRelPrice = g.price;
        bestRelId = g.id;
      }
    });
    if (bestRelId) map.set(bestRelId, 'reliability');

    return map;
  }, [paginatedData]);

  // Best price for F1 telemetry
  const bestPrice = useMemo(() => {
    if (paginatedData.length === 0) return null;
    return Math.min(...paginatedData.map(g => g.price));
  }, [paginatedData]);

  const handlePrevPage = useCallback(() => setPage(p => Math.max(1, p - 1)), []);
  const handleNextPage = useCallback(() => {
    if (validPage < totalPages) setPage(p => p + 1);
  }, [validPage, totalPages]);

  const clearFilters = () => {
    router.push('/');
  };

  const COLUMNS = [
    { label: t("col.provider"), align: "left" as const },
    { label: t("col.gpu"), align: "left" as const },
    { label: t("col.vram"), align: "left" as const },
    { label: t("col.region"), align: "left" as const },
    { label: t("col.type"), align: "left" as const },
    { label: t("col.sla"), align: "left" as const },
    { label: t("col.compliance"), align: "left" as const },
    { label: t("col.price"), align: "right" as const, id: 'price' },
    { label: "", align: "right" as const, id: 'action' },
  ];

  const promotedCount = filteredData.filter(g => g.promoted).length;

  return (
    <section className="flex-1 flex flex-col min-w-0">
      {/* Status Bar */}
      <div className="flex items-center justify-between py-1.5 px-1 mb-1 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {isClientLoaded && (
            <span className="text-xs text-[#666] font-data">
              <span className="text-green-500 font-bold">{uniqueProviders}</span> Providers ·{' '}
              <span className="text-green-500 font-bold">{allInstances.length}+</span> Instances
            </span>
          )}
          <span className="text-[#333]">│</span>
          <span className="text-xs text-[#555] font-data">
            {!isClientLoaded 
              ? t('results.searching')
              : promotedCount > 0
                ? `${promotedCount} ${t('results.promoted')} · ${totalCount} ${t('results.results')}`
                : `${totalCount} ${t('results.results')}`
            }
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Real Cost Toggle */}
          <div className="relative group">
            <button
              onClick={() => setShowRealCost(prev => !prev)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded border text-[11px] font-semibold transition-all ${
                showRealCost
                  ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                  : 'bg-transparent border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#444]'
              }`}
            >
              <DollarSign size={11} />
              Show Real Cost
            </button>
            <div className="absolute bottom-full right-0 mb-1.5 w-48 bg-[#161616] border border-[#2a2a2a] rounded-md p-2 shadow-xl text-[10px] text-[#999] leading-relaxed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
              Includes estimated 1TB storage and network egress overhead (~23%).
            </div>
          </div>

          {isClientLoaded && totalCount > 0 && (
            <select className="bg-transparent border-none text-[11px] text-[#666] focus:ring-0 cursor-pointer outline-none font-data">
              <option>{t('results.priceAsc')}</option>
              <option>{t('results.priceDesc')}</option>
            </select>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-[#1a1a1a] rounded overflow-hidden bg-[#0c0c0c] flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full min-w-[900px] h-full">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#0e0e0e]">
                {COLUMNS.map((col) => (
                  <th
                    key={col.label || 'action'}
                    className={`py-2 px-3 text-[10px] font-semibold text-[#555] uppercase tracking-wider ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    {col.id === 'price' ? (
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <span className="group relative inline-flex" tabIndex={0} aria-describedby="price-estimate-notice">
                          <Info size={11} className="cursor-help text-[#666] transition-colors group-hover:text-[#aaa] group-focus:text-[#aaa]" aria-hidden="true" />
                          <span
                            id="price-estimate-notice"
                            role="tooltip"
                            className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-64 rounded-md border border-[#2a2a2a] bg-[#161616] p-2.5 text-left text-[11px] normal-case font-normal leading-relaxed tracking-normal text-[#aaa] opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                          >
                            Real-time estimates via API/Scraping. Actual billing is strictly determined by the cloud provider. Please check for hidden Egress or Storage fees.
                          </span>
                        </span>
                      </span>
                    ) : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!isClientLoaded ? (
                <>
                  {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                </>
              ) : totalCount === 0 ? (
                <tr>
                  <td colSpan={9} className="py-24 text-center align-middle">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-4">
                        <SearchX size={28} className="text-[#666]" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">No instances found</h3>
                      <p className="text-sm text-[#888] leading-relaxed mb-6">
                        We couldn't find any GPUs matching your current filters. Try adjusting your region, budget, or provider requirements.
                      </p>
                      <button 
                        onClick={clearFilters}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((gpu) => (
                  <GPURow
                    key={gpu.id}
                    gpu={gpu}
                    isBestPrice={bestPrice !== null && gpu.price === bestPrice}
                    showRealCost={showRealCost}
                    badge={badgeMap.get(gpu.id) || null}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {isClientLoaded && totalPages > 1 && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-[#1a1a1a] bg-[#0e0e0e] mt-auto">
            <span className="text-[11px] text-[#555] font-data">
              Page {validPage} of {totalPages} · {totalCount} total
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevPage}
                disabled={validPage <= 1}
                className="p-1 rounded border border-[#2a2a2a] bg-[#111] text-[#888] hover:text-white hover:border-[#444] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const startPage = Math.max(1, Math.min(validPage - 2, totalPages - 4));
                const p = startPage + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded border text-xs font-data transition-colors ${
                      p === validPage
                        ? 'bg-green-600 border-green-600 text-black font-bold'
                        : 'border-[#2a2a2a] bg-[#111] text-[#888] hover:text-white hover:border-[#444]'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={handleNextPage}
                disabled={validPage >= totalPages}
                className="p-1 rounded border border-[#2a2a2a] bg-[#111] text-[#888] hover:text-white hover:border-[#444] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
