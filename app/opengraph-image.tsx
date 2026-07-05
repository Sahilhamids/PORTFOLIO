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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: 80,
          borderWidth: 8,
          borderStyle: 'solid',
          borderColor: '#00d4ff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: 80, fontWeight: 'bold', margin: 0, textAlign: 'center', color: '#ffffff' }}>
            Sahil Hamid Shaikh
          </h1>
          <p style={{ fontSize: 40, color: '#00d4ff', marginTop: 20, textAlign: 'center' }}>
            Full-Stack Engineer • Backend • API Builder
          </p>
          <div style={{ display: 'flex', marginTop: 60, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', padding: '10px 30px', background: '#222222', borderRadius: '100px', fontSize: 24, color: '#a1a1aa' }}>
              sahilhamids-portfolio.vercel.app/
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
