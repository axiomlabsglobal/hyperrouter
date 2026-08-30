import { NextResponse } from 'next/server';
import { getGlobalInstances } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const gpuModel = searchParams.get('model');
    const quantity = searchParams.get('quantity');
    const maxPrice = searchParams.get('max_price');
    const spotEnabled = searchParams.get('spot') === 'true';
    const providers = searchParams.get('providers')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
    const complianceFilter = searchParams.get('compliance')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
    const infraFilter = searchParams.get('infra')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
    const slaFilter = searchParams.get('sla')?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) || [];
    
    // Region / Continent filters (support both 'continent' and 'region' params)
    const rawContinent = searchParams.get('continent') || searchParams.get('region') || '';
    const continentList = rawContinent
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(s => s && s !== 'any' && s !== 'all');

    const minVram = searchParams.get('min_vram') || searchParams.get('vram');

    // Pagination
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('page_size') || '20', 10)));

    // Simulated network latency (fast response)
    await new Promise((resolve) => setTimeout(resolve, page === 1 ? 200 : 80));

    let filtered = [...getGlobalInstances()];

    // ─── 1. GPU Model Filter ───
    if (gpuModel && gpuModel.toLowerCase() !== 'any') {
      const modelLower = gpuModel.toLowerCase();
      filtered = filtered.filter(gpu => gpu.gpuName.toLowerCase().includes(modelLower));
    }

    // ─── 2. GPU Quantity Filter (1x, 2x, 4x, 8x) ───
    if (quantity && quantity.toLowerCase() !== 'any') {
      const qLower = quantity.toLowerCase().replace(/[^0-9x]/g, '');
      filtered = filtered.filter(gpu => {
        const nameLower = gpu.gpuName.toLowerCase();
        return nameLower.startsWith(`${qLower} `) || nameLower.startsWith(`${qLower}-`) || nameLower.includes(`${qLower} `);
      });
    }

    // ─── 3. Provider Filter ───
    if (providers.length > 0) {
      filtered = filtered.filter(gpu =>
        providers.some(p => gpu.provider.toLowerCase() === p || gpu.provider.toLowerCase().includes(p))
      );
    }

    // ─── 4. Spot / On-Demand Filter ───
    if (!spotEnabled) {
      filtered = filtered.filter(gpu => gpu.availability === 'On-Demand');
    }

    // ─── 5. Max Price Filter ───
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter(gpu => gpu.price <= max);
      }
    }

    // ─── 6. Min VRAM Filter ───
    if (minVram && minVram.toLowerCase() !== 'any') {
      const vramNum = parseInt(minVram.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(vramNum)) {
        filtered = filtered.filter(gpu => {
          const gpuVram = parseInt(gpu.vram.replace(/[^0-9]/g, ''), 10);
          return !isNaN(gpuVram) && gpuVram >= vramNum;
        });
      }
    }

    // ─── 7. Continent & Region Filter ───
    if (continentList.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuContinent = (gpu.continent || '').toLowerCase();
        const gpuRegion = (gpu.region || '').toLowerCase();
        
        return continentList.some(target => {
          // Exact or partial continent match (e.g. "europe", "north america", "asia pacific", "global")
          if (gpuContinent === target || gpuContinent.includes(target) || target.includes(gpuContinent)) {
            return true;
          }
          // Region keyword match (e.g. "eu", "us", "ap", "tokyo", "frankfurt", "seoul", etc.)
          if (gpuRegion.includes(target)) {
            return true;
          }
          // Short code mappings
          if ((target === 'eu' || target === 'europe') && (gpuContinent === 'europe' || gpuRegion.includes('eu-') || gpuRegion.includes('europe'))) {
            return true;
          }
          if ((target === 'na' || target === 'us' || target === 'north america') && (gpuContinent === 'north america' || gpuRegion.includes('us-') || gpuRegion.includes('canada'))) {
            return true;
          }
          if ((target === 'ap' || target === 'asia' || target === 'asia pacific') && (gpuContinent === 'asia pacific' || gpuRegion.includes('ap-') || gpuRegion.includes('tokyo') || gpuRegion.includes('seoul') || gpuRegion.includes('singapore'))) {
            return true;
          }
          return false;
        });
      });
    }

    // ─── 8. Compliance Filter (all selected must match) ───
    if (complianceFilter.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuComp = (gpu.compliance || []).map(c => c.toLowerCase());
        return complianceFilter.every(c => gpuComp.some(gc => gc.includes(c) || c.includes(gc)));
      });
    }

    // ─── 9. Infrastructure Tier Filter ───
    if (infraFilter.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuInfra = (gpu.infrastructureTier || '').toLowerCase();
        return infraFilter.some(i => gpuInfra.includes(i) || i.includes(gpuInfra));
      });
    }

    // ─── 10. SLA Filter ───
    if (slaFilter.length > 0) {
      filtered = filtered.filter(gpu => {
        const gpuSla = (gpu.sla || '').toLowerCase();
        return slaFilter.some(s => gpuSla.includes(s) || s.includes(gpuSla));
      });
    }

    // ─── Sort: promoted first (only if they match the filter), then price ascending ───
    filtered.sort((a, b) => {
      if (a.promoted && !b.promoted) return -1;
      if (!a.promoted && b.promoted) return 1;
      return a.price - b.price;
    });

    // ─── Pagination ───
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const startIndex = (page - 1) * pageSize;
    const paginatedResults = filtered.slice(startIndex, startIndex + pageSize);

    // Compute unique providers count from FULL (unfiltered) dataset
    const allInstances = getGlobalInstances();
    const uniqueProviders = new Set(allInstances.map(g => g.provider)).size;

    return NextResponse.json({
      data: paginatedResults,
      meta: {
        page,
        pageSize,
        totalCount,
        totalPages,
        totalProviders: uniqueProviders,
        totalIndexed: allInstances.length,
      },
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch GPUs' }, { status: 500 });
  }
}
