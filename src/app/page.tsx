import React, { Suspense } from 'react';
import { SearchBar } from '@/components/search-hero';
import { FilterSidebar } from '@/components/filter-sidebar';
import { ResultsList } from '@/components/results-list';
import { Navbar } from '@/components/navbar';
import { LiveFeed } from '@/components/live-feed';
import { Footer } from '@/components/footer';

export default function HyperRouterDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-green-500/20 flex flex-col">
      
      {/* Navbar */}
      <Navbar />

      {/* Compact Inline Search Bar */}
      <Suspense fallback={<div className="h-10 bg-[#0d0d0d] border-b border-[#1a1a1a]" />}>
        <SearchBar />
      </Suspense>

      {/* Main Content: Sidebar + Data Table */}
      <main className="max-w-[1600px] mx-auto px-4 py-4 flex gap-4 flex-1 w-full">
        
        {/* Filter Sidebar */}
        <Suspense fallback={<div className="w-56 hidden lg:block" />}>
          <FilterSidebar />
        </Suspense>

        {/* Data Grid */}
        <Suspense fallback={<div className="flex-1 h-[600px] bg-[#0c0c0c] border border-[#1a1a1a] rounded" />}>
          <ResultsList />
        </Suspense>
        
      </main>

      {/* Footer */}
      <Footer />

      {/* Live Activity Feed — Fixed bottom-right */}
      <LiveFeed />
    </div>
  );
}
