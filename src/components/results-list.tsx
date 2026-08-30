"use client";

import React, { useMemo, useState, useCallback } from 'react';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { GPURow } from './gpu-card';
import { SkeletonCard } from './skeleton-card';
import { GPUInstance } from '@/types/gpu';
import { useI18n } from '@/i18n/context';
import { ChevronLeft, ChevronRight, DollarSign, Info } from 'lucide-react';

interface ApiResponse {
  data: GPUInstance[];
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    totalProviders: number;
    totalIndexed: number;
  };
}

type BadgeType = 'value' | 'performance' | 'reliability' | null;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// High-performance GPU architectures
const PERF_GPUS = ['H100', 'H200', 'B200', 'MI300X', 'TPU v5e'];

export function ResultsList() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [showRealCost, setShowRealCost] = useState(false);
  const PAGE_SIZE = 20;

  const queryString = searchParams.toString();
  const apiUrl = `/api/gpus?page=${page}&page_size=${PAGE_SIZE}${queryString ? `&${queryString}` : ''}`;

  const { data: response, error, isLoading } = useSWR<ApiResponse>(apiUrl, fetcher, {
    keepPreviousData: true,
  });

  const gpus = response?.data || [];
  const meta = response?.meta;

  // Reset page when filters change
  const prevQuery = React.useRef(queryString);
  React.useEffect(() => {
    if (prevQuery.current !== queryString) {
      setPage(1);
      prevQuery.current = queryString;
    }
  }, [queryString]);

  // ─── Auto-Scoring: compute badges ───
  const badgeMap = useMemo(() => {
    const map = new Map<string, BadgeType>();
    if (gpus.length === 0) return map;

    // Best Value: lowest price-per-GB-VRAM (non-promoted)
    let bestValueId: string | null = null;
    let bestValueRatio = Infinity;
    gpus.forEach(g => {
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

    // Best Performance: cheapest H100/H200/B200/MI300X (non-promoted, not already badged)
    let bestPerfId: string | null = null;
    let bestPerfPrice = Infinity;
    gpus.forEach(g => {
      if (g.promoted || map.has(g.id)) return;
      const isHighPerf = PERF_GPUS.some(p => g.gpuName.includes(p));
      if (isHighPerf && g.price < bestPerfPrice) {
        bestPerfPrice = g.price;
        bestPerfId = g.id;
      }
    });
    if (bestPerfId) map.set(bestPerfId, 'performance');

    // Best Reliability: cheapest 99.99% SLA with compliance (non-promoted, not already badged)
    let bestRelId: string | null = null;
    let bestRelPrice = Infinity;
    gpus.forEach(g => {
      if (g.promoted || map.has(g.id)) return;
      if (g.sla === '99.99%' && g.compliance.length >= 2 && g.price < bestRelPrice) {
        bestRelPrice = g.price;
        bestRelId = g.id;
      }
    });
    if (bestRelId) map.set(bestRelId, 'reliability');

    return map;
  }, [gpus]);

  // Best price for F1 telemetry
  const bestPrice = useMemo(() => {
    if (gpus.length === 0) return null;
    return Math.min(...gpus.map(g => g.price));
  }, [gpus]);

  const handlePrevPage = useCallback(() => setPage(p => Math.max(1, p - 1)), []);
  const handleNextPage = useCallback(() => {
    if (meta && page < meta.totalPages) setPage(p => p + 1);
  }, [meta, page]);

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

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-8 text-[#888] border border-red-500/15 rounded bg-red-500/5">
        <p className="text-sm font-semibold text-white">{t('results.failed')}</p>
        <p className="text-xs mt-1">{t('results.failedHint')}</p>
      </div>
    );
  }

  const promoted = gpus.filter(g => g.promoted).length;

  return (
    <section className="flex-1 flex flex-col min-w-0">
      {/* Status Bar */}
      <div className="flex items-center justify-between py-1.5 px-1 mb-1 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {meta && (
            <span className="text-xs text-[#666] font-data">
              <span className="text-green-500 font-bold">{meta.totalProviders}</span> Providers ·{' '}
              <span className="text-green-500 font-bold">{meta.totalIndexed}+</span> Instances
            </span>
          )}
          <span className="text-[#333]">│</span>
          <span className="text-xs text-[#555] font-data">
            {isLoading && !response
              ? t('results.searching')
              : promoted > 0
                ? `${promoted} ${t('results.promoted')} · ${meta?.totalCount || 0} ${t('results.results')}`
                : `${meta?.totalCount || 0} ${t('results.results')}`
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
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-1.5 w-48 bg-[#161616] border border-[#2a2a2a] rounded-md p-2 shadow-xl text-[10px] text-[#999] leading-relaxed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
              Includes estimated 1TB storage and network egress overhead (~23%).
            </div>
          </div>

          {!isLoading && gpus.length > 0 && (
            <select className="bg-transparent border-none text-[11px] text-[#666] focus:ring-0 cursor-pointer outline-none font-data">
              <option>{t('results.priceAsc')}</option>
              <option>{t('results.priceDesc')}</option>
            </select>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-[#1a1a1a] rounded overflow-hidden bg-[#0c0c0c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
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
              {isLoading && !response ? (
                <>
                  {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                </>
              ) : gpus.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center">
                    <p className="text-sm font-semibold text-white">{t('results.noResults')}</p>
                    <p className="text-xs text-[#555] mt-1">{t('results.noResultsHint')}</p>
                  </td>
                </tr>
              ) : (
                gpus.map((gpu) => (
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
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-[#1a1a1a] bg-[#0e0e0e]">
            <span className="text-[11px] text-[#555] font-data">
              Page {meta.page} of {meta.totalPages} · {meta.totalCount} total
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevPage}
                disabled={page <= 1}
                className="p-1 rounded border border-[#2a2a2a] bg-[#111] text-[#888] hover:text-white hover:border-[#444] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                const startPage = Math.max(1, Math.min(page - 2, meta.totalPages - 4));
                const p = startPage + i;
                if (p > meta.totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded border text-xs font-data transition-colors ${
                      p === page
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
                disabled={page >= meta.totalPages}
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
