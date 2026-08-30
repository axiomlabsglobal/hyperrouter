import React from 'react';

export function SkeletonCard() {
  return (
    <tr className="border-b border-[#1a1a1a] animate-pulse">
      <td className="py-2.5 px-3"><div className="h-4 w-20 bg-[#1a1a1a] rounded-sm" /></td>
      <td className="py-2.5 px-3"><div className="h-4 w-40 bg-[#1a1a1a] rounded-sm" /></td>
      <td className="py-2.5 px-3"><div className="h-4 w-16 bg-[#1a1a1a] rounded-sm" /></td>
      <td className="py-2.5 px-3"><div className="h-4 w-28 bg-[#1a1a1a] rounded-sm" /></td>
      <td className="py-2.5 px-3"><div className="h-4 w-16 bg-[#1a1a1a] rounded-sm" /></td>
      <td className="py-2.5 px-3"><div className="h-4 w-12 bg-[#1a1a1a] rounded-sm" /></td>
      <td className="py-2.5 px-3"><div className="h-4 w-24 bg-[#1a1a1a] rounded-sm" /></td>
      <td className="py-2.5 px-3 text-right"><div className="h-4 w-14 bg-[#1a1a1a] rounded-sm ml-auto" /></td>
      <td className="py-2.5 px-3 text-right"><div className="h-5 w-14 bg-[#1a1a1a] rounded-sm ml-auto" /></td>
    </tr>
  );
}
