import { ImageResponse } from 'next/og'

export const alt = 'Sahil Hamid Shaikh Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid background dots */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          display: 'flex',
        }} />

        {/* Cyan glow blob top-left */}
        <div style={{
          position: 'absolute', top: -100, left: -100,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Purple glow blob bottom-right */}
        <div style={{
          position: 'absolute', bottom: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Left column content */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '60px 70px', flex: 1, position: 'relative', zIndex: 1,
        }}>
          {/* Label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 28,
          }}>
            <div style={{ width: 32, height: 2, background: '#00d4ff' }} />
            <span style={{ fontSize: 16, color: '#00d4ff', letterSpacing: 4, textTransform: 'uppercase', fontWeight: 600 }}>
              Based in India
            </span>
          </div>

          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 24 }}>
            <span style={{ fontSize: 86, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2, color: '#ffffff' }}>
              SAHIL HAMID
            </span>
            <span style={{ fontSize: 86, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2, color: '#00d4ff' }}>
              SHAIKH
            </span>
          </div>

          {/* Role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <span style={{ fontSize: 22, color: '#a1a1aa' }}>I build</span>
            <span style={{
              fontSize: 22, color: '#00d4ff', fontWeight: 700, fontFamily: 'monospace',
              background: 'rgba(0,212,255,0.08)', padding: '4px 16px', borderRadius: 4,
            }}>
              Backend Systems
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 40, marginTop: 32, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { value: '140+', label: 'LeetCode Problems' },
              { value: '6+', label: 'Projects Built' },
              { value: '1st', label: 'Capstone Rank' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#00d4ff' }}>{s.value}</span>
                <span style={{ fontSize: 13, color: '#71717a', marginTop: 4 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: URL badge */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          justifyContent: 'flex-end', padding: '50px 60px', position: 'relative', zIndex: 1,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.05)',
            borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.12)',
            padding: '10px 22px', borderRadius: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff' }} />
            <span style={{ fontSize: 16, color: '#a1a1aa', fontFamily: 'monospace' }}>
              sahilhamids-portfolio.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
