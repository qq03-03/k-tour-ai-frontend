import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { mockSegments } from '../data/mockSegments.js'
import { videos } from '../data/videos.js'

export default function Detail() {
  const { segmentId } = useParams()
  const segment = mockSegments.find((s) => s.segment_id === segmentId)

  if (!segment) {
    return (
      <div>
        <Header />
        <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>
          <p>해당 장면을 찾을 수 없어요.</p>
          <Link to="/search" style={{ color: 'var(--color-primary)' }}>검색으로 돌아가기</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const video = videos[segment.video_id]

  return (
    <div>
      <Header />
      <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg,#c7d2fe,#a5f3fc)' }}>
        <img src={segment.keyframe_path} alt={segment.spot_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '20px 24px' }}>
        <h2 style={{ margin: 0, fontSize: 19 }}>{segment.spot_name}</h2>
        <p style={{ fontSize: 12.5, color: '#64748b', margin: '4px 0 14px' }}>
          📍 {segment.place_name} · ⏱ {segment.start_time.toFixed(2)}s–{segment.end_time.toFixed(2)}s
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {segment.mood.slice(0, 3).map((tag) => (
            <span key={tag} style={{ background: '#EFF6FF', color: 'var(--color-primary)', borderRadius: 16, padding: '6px 12px', fontSize: 12, fontWeight: 600 }}>
              {tag}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.6, marginBottom: 20 }}>{segment.description}</p>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: '0 4px 14px rgba(15,23,42,.05)' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 13 }}>🎬 이 장면이 담긴 영상</h4>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{video.title}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
