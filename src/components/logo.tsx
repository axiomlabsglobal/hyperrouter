import React from 'react';

/**
 * HyperRouter SVG Logo — Pure inline SVG, zero image dependencies.
 * Symbol: Two 45° crossed routing arrows forming an "H" intersection,
 * with emerald-to-blue gradient. Conveys network routing / switching.
 */

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 22, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG Symbol */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="HyperRouter logo"
      >
        <defs>
          <linearGradient id="hr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF66" />
            <stop offset="100%" stopColor="#0070F3" />
          </linearGradient>
        </defs>
        {/* Rounded background */}
        <rect width="32" height="32" rx="7" fill="#111" />
        {/* Arrow 1: bottom-left → top-right */}
        <path
          d="M8 24L24 8"
          stroke="url(#hr-grad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18 8H24V14"
          stroke="url(#hr-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrow 2: top-left → bottom-right */}
        <path
          d="M8 8L24 24"
          stroke="url(#hr-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M18 24H24V18"
          stroke="url(#hr-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
        {/* Center node */}
        <circle cx="16" cy="16" r="2" fill="url(#hr-grad)" />
      </svg>

      {/* Logotype */}
      {showText && (
        <span className="text-[15px] tracking-tight leading-none select-none">
          <span className="font-extrabold text-white">Hyper</span>
          <span className="font-light text-gray-400">Router</span>
        </span>
      )}
    </div>
  );
}

/**
 * Standalone SVG symbol for favicon / icon use.
 * Returns raw SVG string for use in icon.tsx or metadata.
 */
export function LogoSymbolSVG(): string {
  return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00FF66"/><stop offset="100%" stop-color="#0070F3"/></linearGradient></defs>
  <rect width="32" height="32" rx="7" fill="#111"/>
  <path d="M8 24L24 8" stroke="url(#g)" stroke-width="2" stroke-linecap="round"/>
  <path d="M18 8H24V14" stroke="url(#g)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 8L24 24" stroke="url(#g)" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
  <path d="M18 24H24V18" stroke="url(#g)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
  <circle cx="16" cy="16" r="2" fill="url(#g)"/>
</svg>`;
}
