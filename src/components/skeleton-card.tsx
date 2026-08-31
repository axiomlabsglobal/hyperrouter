import React from 'react';

export function SkeletonCard() {
  return (
    <tr className="border-b border-[#1a1a1a]">
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-[#1a1a1a] rounded animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="h-4 w-36 bg-[#1a1a1a] rounded animate-pulse" />
      </td>
      <td className="py-3 px-3">
        <div className="h-4 w-14 bg-[#1a1a1a] rounded animate-pulse" />
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-1">
          <div className="h-4 w-28 bg-[#1a1a1a] rounded animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] animate-pulse" />
          <div className="h-4 w-16 bg-[#1a1a1a] rounded animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="h-5 w-14 bg-[#1a1a1a] rounded-full animate-pulse" />
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-1">
          <div className="h-5 w-16 bg-[#1a1a1a] rounded-full animate-pulse" />
          <div className="h-5 w-12 bg-[#1a1a1a] rounded-full animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-3 text-right">
        <div className="h-5 w-16 bg-[#1a1a1a] rounded animate-pulse ml-auto" />
      </td>
      <td className="py-3 px-3 text-right">
        <div className="h-7 w-16 bg-[#1a1a1a] rounded animate-pulse ml-auto" />
      </td>
    </tr>
  );
}
