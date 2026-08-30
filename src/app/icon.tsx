import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111',
          borderRadius: 7,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF66" />
              <stop offset="100%" stopColor="#0070F3" />
            </linearGradient>
          </defs>
          <path d="M8 24L24 8" stroke="url(#g)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 8H24V14" stroke="url(#g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8L24 24" stroke="url(#g)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <path d="M18 24H24V18" stroke="url(#g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          <circle cx="16" cy="16" r="2.5" fill="url(#g)" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
