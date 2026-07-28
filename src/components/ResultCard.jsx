import { Link } from 'react-router-dom'

function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function ResultCard({ segment }) {
  return (
    <Link
      to={`/segment/${segment.segment_id}`}
      style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 14px rgba(15,23,42,.06)', display: 'flex', overflow: 'hidden' }}
    >
      <img
        src={segment.keyframe_path}
        alt={segment.spot_name}
        style={{ width: 96, height: 96, objectFit: 'cover', flexShrink: 0 }}
      />
      <div style={{ padding: '12px 14px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 0, fontSize: 14.5, color: '#1e293b' }}>{segment.spot_name}</h4>
          <span style={{ background: '#ECFDF5', color: '#0f9d78', fontSize: 11, fontWeight: 700, borderRadius: 10, padding: '3px 8px' }}>
            {Math.round(segment.similarity * 100)}%
          </span>
        </div>
        <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 8px' }}>{segment.description}</p>
        <div style={{ fontSize: 11.5, color: '#94a3b8' }}>
          ⏱ {formatSeconds(segment.start_time)}–{formatSeconds(segment.end_time)}
        </div>
      </div>
    </Link>
  )
}
