"use client";

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { GPURow } from './gpu-card';
import { SkeletonCard } from './skeleton-card';
import { useI18n } from '@/i18n/context';
import { ChevronLeft, ChevronRight, DollarSign, Info, SearchX, ArrowUp, ArrowDown, RefreshCw, AlertTriangle } from 'lucide-react';
import { GPUInstance } from '@/types/gpu';

type BadgeType = 'value' | 'performance' | 'reliability' | null;
const PERF_GPUS = ['H100', 'H200', 'B200', 'MI300X', 'TPU v5e'];

interface ResultsListProps {
  data: GPUInstance[];
  totalCount: number;
  uniqueProviders: number;
  clearFilters: () => void;
}

export function ResultsList({ data, totalCount: globalTotalCount, uniqueProviders, clearFilters }: ResultsListProps) {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const [showRealCost, setShowRealCost] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'price',
    direction: 'asc'
  });
  
  const PAGE_SIZE = 20;

  // ─── Data Resilience / Fallback Cache ───
  const [cachedData, setCachedData] = useState<GPUInstance[]>(data);
  const [isSyncingFallback, setIsSyncingFallback] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setCachedData(data);
      setIsSyncingFallback(false);
    } else if (globalTotalCount === 0 && cachedData.length > 0) {
      // Upstream provider crawling/API temporary empty payload -> fallback to cached data
      setIsSyncingFallback(true);
    }
  }, [data, globalTotalCount, cachedData.length]);

  // Use cached data if current data is unexpectedly empty due to vendor scraping glitch
  const effectiveData = (data && data.length > 0) ? data : (isSyncingFallback ? cachedData : data);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [effectiveData]);

  // ─── Sorting ───
  const sortedData = useMemo(() => {
    const sortableData = [...effectiveData];
    sortableData.sort((a, b) => {
      let aVal: any = a.id;
      let bVal: any = b.id;

      if (sortConfig.key === 'vram') {
        aVal = parseFloat(a.vram) || 0;
        bVal = parseFloat(b.vram) || 0;
      } else if (sortConfig.key === 'gpu') {
        aVal = a.gpuName;
        bVal = b.gpuName;
      } else if (sortConfig.key === 'provider') {
        aVal = a.provider;
        bVal = b.provider;
      } else if (sortConfig.key === 'price') {
        aVal = a.price;
        bVal = b.price;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortableData;
  }, [data, sortConfig]);

  // ─── Pagination ───
  const currentTotalCount = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(currentTotalCount / PAGE_SIZE));
  const validPage = Math.min(page, totalPages);
  
  const paginatedData = useMemo(() => {
    const startIndex = (validPage - 1) * PAGE_SIZE;
    return sortedData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedData, validPage, PAGE_SIZE]);

  // ─── Auto-Scoring: compute badges ───
  const badgeMap = useMemo(() => {
    const map = new Map<string, BadgeType>();
    if (paginatedData.length === 0) return map;

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

  const bestPrice = useMemo(() => {
    if (paginatedData.length === 0) return null;
    return Math.min(...paginatedData.map(g => g.price));
  }, [paginatedData]);

  const handlePrevPage = useCallback(() => setPage(p => Math.max(1, p - 1)), []);
  const handleNextPage = useCallback(() => {
    if (validPage < totalPages) setPage(p => p + 1);
  }, [validPage, totalPages]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const COLUMNS = [
    { label: t("col.provider"), align: "left" as const, id: 'provider', sortable: true },
    { label: t("col.gpu"), align: "left" as const, id: 'gpu', sortable: true },
    { label: t("col.vram"), align: "left" as const, id: 'vram', sortable: true },
    { label: t("col.region"), align: "left" as const },
    { label: t("col.type"), align: "left" as const },
    { label: t("col.sla"), align: "left" as const },
    { label: t("col.compliance"), align: "left" as const },
    { label: t("col.price"), align: "right" as const, id: 'price', sortable: true },
    { label: "", align: "right" as const, id: 'action' },
  ];

  const promotedCount = sortedData.filter(g => g.promoted).length;

  return (
    <section className="flex-1 flex flex-col min-w-0">
      <div className="flex items-center justify-between py-1.5 px-1 mb-1 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {isClientLoaded && (
            <span className="text-xs text-[#666] font-data flex items-center gap-2">
              <span className="text-green-500 font-bold tabular-nums">{uniqueProviders}</span> Providers ·{' '}
              <span className="text-green-500 font-bold tabular-nums">{globalTotalCount}+</span> Instances
            </span>
          )}
          <span className="text-[#333]">│</span>
          <span className="text-xs text-[#555] font-data tabular-nums">
            {!isClientLoaded 
              ? t('results.searching')
              : promotedCount > 0
                ? `${promotedCount} ${t('results.promoted')} · ${currentTotalCount} ${t('results.results')}`
                : `${currentTotalCount} ${t('results.results')}`
            }
          </span>
          <span className="text-[#333]">│</span>
          {/* Live Sync Timestamp Badge */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400 font-data">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Live Sync: Updated 3m ago
          </span>
        </div>

        <div className="flex items-center gap-3">
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
              {t('results.showRealCost')}
            </button>
            <div className="absolute bottom-full right-0 mb-1.5 w-48 bg-[#161616] border border-[#2a2a2a] rounded-md p-2 shadow-xl text-[10px] text-[#999] leading-relaxed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
              {t('results.realCostDesc')}
            </div>
          </div>
        </div>
      </div>

      {/* Data Resilience / Vendor Outage Fallback Banner */}
      {isSyncingFallback && (
        <div className="mb-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <RefreshCw size={13} className="animate-spin text-amber-400 shrink-0" />
            <span className="font-medium">
              데이터 실시간 재동기화 중 (Vendor API Syncing): 일부 벤더사 응답 지연으로 직전 안정 캐시 데이터를 안전하게 표시하고 있습니다.
            </span>
          </div>
          <span className="text-[10px] text-amber-400/80 font-data uppercase tracking-wider hidden sm:inline">
            Cached Fallback Active
          </span>
        </div>
      )}

      <div className="border border-[#1a1a1a] rounded overflow-hidden bg-[#0c0c0c] flex-1 flex flex-col relative">
        <div className="overflow-x-auto flex-1">
          <table className="w-full min-w-[900px] h-full relative">
            <thead className="sticky top-0 z-10 bg-[#0e0e0e] shadow-[0_1px_0_0_#1e1e1e]">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.label || col.id || 'action'}
                    onClick={() => col.sortable && col.id && handleSort(col.id)}
                    className={`py-2 px-3 text-[10px] font-bold uppercase tracking-wider ${col.align === 'right' ? 'text-right' : 'text-left'} ${col.sortable ? 'cursor-pointer hover:bg-[#1a1a1a] hover:text-white text-[#666] select-none transition-all' : 'text-[#555]'}`}
                  >
                    <div className={`flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
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
                      {col.sortable && col.id && sortConfig.key === col.id && (
                        sortConfig.direction === 'asc' ? <ArrowUp size={12} className="text-[#888]" /> : <ArrowDown size={12} className="text-[#888]" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!isClientLoaded ? (
                <>
                  {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                </>
              ) : currentTotalCount === 0 ? (
                <tr>
                  <td colSpan={9} className="py-24 text-center align-middle">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-4">
                        <SearchX size={28} className="text-[#666] opacity-40" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">조건에 맞는 GPU 인스턴스가 없습니다</h3>
                      <p className="text-sm text-[#555] mt-1">필터 조건을 변경하거나 초기화하여 다시 검색해 보세요.</p>
                      <button 
                        onClick={clearFilters}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors mt-6"
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

        {isClientLoaded && totalPages > 1 && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-[#1a1a1a] bg-[#0e0e0e] mt-auto">
            <span className="text-[11px] text-[#555] font-data tabular-nums">
              Page {validPage} of {totalPages} · {currentTotalCount} total
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
                    className={`w-7 h-7 rounded border text-xs font-data tabular-nums transition-colors ${
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
