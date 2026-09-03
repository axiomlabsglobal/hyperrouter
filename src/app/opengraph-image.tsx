import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HyperRouter - Real-time Global GPU Price Index & Cloud Metasearch';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Top Logo & Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: '900',
                fontSize: '28px',
              }}
            >
              H
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', letterSpacing: '-1px' }}>
              HyperRouter
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '999px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#4ade80',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '999px', background: '#22c55e' }} />
            Live Sync: 19 Providers
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-2px',
            }}
          >
            Real-time Global GPU Price Index & Cloud Metasearch
          </div>
          <div style={{ fontSize: '24px', color: '#888888', lineHeight: 1.4 }}>
            Instantly compare H100, A100, B200 spot & on-demand rates across Lambda, RunPod, PrimeIntellect, Nebius & AWS.
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            width: '100%',
            padding: '24px 32px',
            borderRadius: '20px',
            background: '#121212',
            border: '1px solid #242424',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '13px', color: '#666666', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>
              H100 SXM5
            </div>
            <div style={{ fontSize: '28px', color: '#22c55e', fontWeight: '800' }}>
              from .89/hr
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: '#262626' }} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '13px', color: '#666666', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>
              A100 80GB
            </div>
            <div style={{ fontSize: '28px', color: '#ffffff', fontWeight: '800' }}>
              from .79/hr
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: '#262626' }} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '13px', color: '#666666', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>
              Indexed Instances
            </div>
            <div style={{ fontSize: '28px', color: '#ffffff', fontWeight: '800' }}>
              40+ Configs
            </div>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: '#666', fontSize: '18px', fontWeight: '600' }}>
            hyperrouter.io
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
