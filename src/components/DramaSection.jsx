import { Link } from 'react-router-dom'
import { mockSegments } from '../data/mockSegments.js'
import { getFeaturedDramas } from '../lib/getFeaturedDramas.js'
import { localizeSegment } from '../lib/localizeSegment.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function DramaSection() {
  const { lang } = useLanguage()
  const dramas = getFeaturedDramas(mockSegments).map((segment) => localizeSegment(segment, lang))

  return (
    <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
      {dramas.map((drama) => (
        <Link key={drama.uid} to={`/segment/${drama.uid}`} style={{ flex: '0 0 140px' }}>
          <img
            src={`${import.meta.env.BASE_URL}${drama.keyframe_path}`}
            alt={drama.drama_title}
            style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 16 }}
          />
          <p style={{ fontSize: 12.5, margin: '8px 0 0', fontWeight: 600, color: 'var(--color-text)' }}>{drama.drama_title}</p>
        </Link>
      ))}
    </div>
  )
}
