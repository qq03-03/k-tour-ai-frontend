import { dramas } from '../data/dramas.js'

export default function DramaSection() {
  return (
    <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
      {dramas.map((drama) => (
        <div key={drama.title} style={{ flex: '0 0 140px' }}>
          <div style={{ height: 90, borderRadius: 16, background: 'linear-gradient(135deg,#c7d2fe,#a5f3fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            🎬
          </div>
          <p style={{ fontSize: 12.5, margin: '8px 0 0', fontWeight: 600 }}>{drama.title}</p>
        </div>
      ))}
    </div>
  )
}
