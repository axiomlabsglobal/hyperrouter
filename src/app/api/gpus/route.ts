import { NextResponse } from 'next/server';
import { getGlobalInstances } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const gpuModel = searchParams.get('model');
    const maxPrice = searchParams.get('max_price');
    const spotEnabled = searchParams.get('spot') === 'true';
    const providers = searchParams.get('providers')?.split(',').filter(Boolean) || [];
    const complianceFilter = searchParams.get('compliance')?.split(',').filter(Boolean) || [];
    const infraFilter = searchParams.get('infra')?.split(',').filter(Boolean) || [];
    const slaFilter = searchParams.get('sla')?.split(',').filter(Boolean) || [];
    const continentFilter = searchParams.get('continent')?.split(',').filter(Boolean) || [];
    const minVram = searchParams.get('min_vram');

    // Pagination
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('page_size') || '20', 10)));

    // Simulated network latency (lower for paginated requests)
    await new Promise((resolve) => setTimeout(resolve, page === 1 ? 400 : 150));

    let filtered = [...getGlobalInstances()];

    // ─── Filters ───
    if (gpuModel) {
      filtered = filtered.filter(gpu => gpu.gpuName.toLowerCase().includes(gpuModel.toLowerCase()));
    }
    if (providers.length > 0) {
      filtered = filtered.filter(gpu => providers.includes(gpu.provider));
    }
    if (!spotEnabled) {
      filtered = filtered.filter(gpu => gpu.availability === 'On-Demand');
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) filtered = filtered.filter(gpu => gpu.price <= max);
    }
    if (minVram) {
      const vramNum = parseInt(minVram, 10);
      if (!isNaN(vramNum)) {
        filtered = filtered.filter(gpu => {
          const gpuVram = parseInt(gpu.vram, 10);
          return !isNaN(gpuVram) && gpuVram >= vramNum;
        });
      }
    }
    if (continentFilter.length > 0) {
      filtered = filtered.filter(gpu => continentFilter.includes(gpu.continent));
    }
    if (complianceFilter.length > 0) {
      filtered = filtered.filter(gpu =>
        complianceFilter.every(c => gpu.compliance.includes(c))
      );
    }
    if (infraFilter.length > 0) {
      filtered = filtered.filter(gpu => infraFilter.includes(gpu.infrastructureTier));
    }
    if (slaFilter.length > 0) {
      filtered = filtered.filter(gpu => slaFilter.includes(gpu.sla));
    }

    // ─── Sort: promoted first, then price ascending ───
    filtered.sort((a, b) => {
      if (a.promoted && !b.promoted) return -1;
      if (!a.promoted && b.promoted) return 1;
      return a.price - b.price;
    });

    // ─── Pagination ───
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
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
    }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch GPUs' }, { status: 500 });
  }
}
