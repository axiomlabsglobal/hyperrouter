"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { SearchBar } from '@/components/search-hero';
import { FilterSidebar } from '@/components/filter-sidebar';
import { ResultsList } from '@/components/results-list';
import { Navbar } from '@/components/navbar';
import { LiveFeed } from '@/components/live-feed';
import { Footer } from '@/components/footer';
import { getGlobalInstances } from '@/lib/mock-data';

export interface FilterState {
  model: string;
  quantity: string;
  min_vram: string;
  continent: string[];
  providers: string[];
  compliance: string[];
  infra: string[];
  sla: string[];
  spot: boolean;
  max_price: string;
}

const DEFAULT_FILTERS: FilterState = {
  model: 'Any', quantity: 'Any', min_vram: 'Any',
  continent: [], providers: [], compliance: [],
  infra: [], sla: [], spot: false, max_price: '50',
};

// ─── URL 파싱 유틸 ───
function readFiltersFromURL(): FilterState {
  if (typeof window === 'undefined') return DEFAULT_FILTERS;
  const p = new URLSearchParams(window.location.search);
  const arr = (k: string) => { const v = p.get(k); return v ? v.split(',').map(s => s.trim()).filter(Boolean) : []; };
  return {
    model: p.get('model') || 'Any',
    quantity: p.get('quantity') || 'Any',
    min_vram: p.get('min_vram') || 'Any',
    continent: arr('continent'), providers: arr('providers'),
    compliance: arr('compliance'), infra: arr('infra'), sla: arr('sla'),
    spot: p.get('spot') === 'true',
    max_price: p.get('max_price') || '50',
  };
}

function writeFiltersToURL(f: FilterState): void {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams();
  if (f.model && f.model !== 'Any') p.set('model', f.model);
  if (f.quantity && f.quantity !== 'Any') p.set('quantity', f.quantity);
  if (f.min_vram && f.min_vram !== 'Any') p.set('min_vram', f.min_vram);
  if (f.spot) p.set('spot', 'true');
  if (f.max_price && f.max_price !== '50') p.set('max_price', f.max_price);
  if (f.continent.length > 0) p.set('continent', f.continent.join(','));
  if (f.providers.length > 0) p.set('providers', f.providers.join(','));
  if (f.compliance.length > 0) p.set('compliance', f.compliance.join(','));
  if (f.infra.length > 0) p.set('infra', f.infra.join(','));
  if (f.sla.length > 0) p.set('sla', f.sla.join(','));
  const s = p.toString();
  window.history.replaceState(null, '', s ? `/?${s}` : '/');
}

export default function HyperRouterDashboard() {
  // ─── 1. 중앙 State (Single Source of Truth) ───
  // SSR 시 DEFAULT, 클라이언트 마운트 시 URL에서 읽어옴
  const [activeFilters, setActiveFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const isInitialized = useRef(false);

  // 초기 로드 시 딱 한 번만 URL을 읽어와서 State 세팅
  useEffect(() => {
    const fromURL = readFiltersFromURL();
    setActiveFilters(fromURL);
    isInitialized.current = true;
    console.log("[INIT] URL에서 읽어온 필터:", fromURL);
  }, []);

  // ─── 2. 사이드바에서 호출할 State 업데이트 함수 ───
  // State 업데이트 + URL 동기화를 동시에 수행
  const updateFilters: React.Dispatch<React.SetStateAction<FilterState>> = useCallback((action) => {
    setActiveFilters(prev => {
      const next = typeof action === 'function' ? action(prev) : action;
      console.log("[UPDATE] 필터 변경됨:", {
        providers: next.providers,
        continent: next.continent,
        compliance: next.compliance,
      });
      // URL을 즉시 동기화 (서버 통신 없음)
      writeFiltersToURL(next);
      return next;
    });
  }, []);

  // ─── 3. 데이터 로드 (싱글턴, 한 번만) ───
  const allInstances = useMemo(() => getGlobalInstances(), []);

  // ─── 4. useMemo는 오직 activeFilters State에만 의존 ───
  const filteredData = useMemo(() => {
    if (!allInstances || allInstances.length === 0) return [];

    return allInstances.filter(item => {
      // [1] Region — item.continent 직접 비교
      let passRegion = true;
      if (activeFilters.continent.length > 0) {
        const hasGlobal = activeFilters.continent.includes('Global') || activeFilters.continent.includes('Any Region');
        if (!hasGlobal) {
          passRegion = activeFilters.continent.includes(item.continent);
        }
      }

      // [2] Provider — 소문자 부분일치
      let passProvider = true;
      if (activeFilters.providers.length > 0) {
        const pl = (item.provider || '').toLowerCase();
        passProvider = activeFilters.providers.some(p => pl.includes(p.toLowerCase()));
      }

      // [3] Compliance — every (선택한 모든 인증 포함 필수)
      let passCompliance = true;
      if (activeFilters.compliance.length > 0) {
        const ic = item.compliance || [];
        passCompliance = activeFilters.compliance.every(c =>
          ic.some((x: string) => x.toLowerCase().includes(c.toLowerCase()))
        );
      }

      // [4] SLA
      let passSla = true;
      if (activeFilters.sla.length > 0) {
        passSla = activeFilters.sla.includes(item.sla || '');
      }

      // [5] Infra
      let passInfra = true;
      if (activeFilters.infra.length > 0) {
        passInfra = activeFilters.infra.includes(item.infrastructureTier || '');
      }

      // [6] Spot
      const passSpot = activeFilters.spot ? true : (item.availability || '').toLowerCase() !== 'spot';

      // [7] GPU 모델
      let passSearch = true;
      if (activeFilters.model && activeFilters.model !== 'Any') {
        passSearch = (item.gpuName || '').toLowerCase().includes(activeFilters.model.toLowerCase());
      }

      // [8] Quantity
      let passQuantity = true;
      if (activeFilters.quantity && activeFilters.quantity.toLowerCase() !== 'any') {
        const q = activeFilters.quantity.toLowerCase().replace(/[^0-9x]/g, '');
        passQuantity = (item.gpuName || '').toLowerCase().includes(q);
      }

      // [9] 가격
      let passPrice = true;
      if (activeFilters.max_price && activeFilters.max_price !== '50') {
        const max = parseFloat(activeFilters.max_price);
        if (!isNaN(max)) passPrice = item.price <= max;
      }

      // [10] VRAM
      let passVram = true;
      if (activeFilters.min_vram && activeFilters.min_vram.toLowerCase() !== 'any') {
        const vn = parseInt(activeFilters.min_vram.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(vn)) {
          const gv = parseInt((item.vram || '').replace(/[^0-9]/g, ''), 10);
          passVram = !isNaN(gv) && gv >= vn;
        }
      }

      return passRegion && passProvider && passCompliance && passSla && passInfra && passSpot && passSearch && passQuantity && passPrice && passVram;
    }).sort((a, b) => {
      if (a.promoted && !b.promoted) return -1;
      if (!a.promoted && b.promoted) return 1;
      return a.price - b.price;
    });
  }, [allInstances, activeFilters]);

  console.log("[RENDER] 필터 통과한 찐 데이터 개수:", filteredData.length);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-green-500/20 flex flex-col">
      <div className="sticky top-0 z-40 bg-[#0a0a0a]">
        <Navbar />
        <SearchBar filters={activeFilters} setFilters={updateFilters} />
      </div>
      
      <main className="max-w-[1600px] mx-auto px-4 py-4 flex gap-4 flex-1 w-full relative">
        <FilterSidebar filters={activeFilters} setFilters={updateFilters} />
        <ResultsList
          data={filteredData}
          totalCount={allInstances.length}
          uniqueProviders={new Set(allInstances.map(g => g.provider)).size}
          clearFilters={() => updateFilters({ ...DEFAULT_FILTERS })}
        />
      </main>
      <div className="mt-auto">
        <Footer />
        <LiveFeed />
      </div>
    </div>
  );
}
