import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import KakaoMap from '../components/KakaoMap.jsx'
import { mockSegments } from '../data/mockSegments.js'
import { placeCoordinates } from '../data/placeCoordinates.js'
import { videoSources } from '../data/videoSources.js'
import { getMapMarkers } from '../lib/getMapMarkers.js'
import { localizeSegment } from '../lib/localizeSegment.js'
import { buildVideoUrl } from '../lib/buildVideoUrl.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Detail() {
  const { segmentId: uid } = useParams()
  const { lang, t } = useLanguage()
  const found = mockSegments.find((s) => s.uid === uid)
  const segment = found ? localizeSegment(found, lang) : undefined
  const videoSource = segment ? videoSources[segment.video_id] : undefined

  if (!segment) {
    return (
      <div>
        <Header />
        <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>
          <p>{t('detail_not_found')}</p>
          <Link to="/search" style={{ color: 'var(--color-primary)' }}>{t('detail_back_to_search')}</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="detail-media-row">
        <div className="detail-media-row__image" style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg,#c7d2fe,#a5f3fc)' }}>
          <img src={`${import.meta.env.BASE_URL}${segment.keyframe_path}`} alt={segment.place_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="detail-media-row__map" style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 4px 14px rgba(15,23,42,.05)' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 13 }}>📍 {t('detail_location_heading')}</h4>
          <KakaoMap markers={getMapMarkers([segment], placeCoordinates)} />
        </div>
      </div>
      <div style={{ padding: '20px 24px' }}>
        <h2 style={{ margin: 0, fontSize: 19 }}>{segment.place_name}</h2>
        <p style={{ fontSize: 12.5, color: '#64748b', margin: '4px 0 14px' }}>
          📍 {segment.region} · ⏱ {segment.start_time.toFixed(2)}s–{segment.end_time.toFixed(2)}s
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {segment.mood.slice(0, 3).map((tag) => (
            <span key={tag} style={{ background: '#EFF6FF', color: 'var(--color-primary)', borderRadius: 16, padding: '6px 12px', fontSize: 12, fontWeight: 600 }}>
              {tag}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.6, marginBottom: 20 }}>{segment.description}</p>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 4px 14px rgba(15,23,42,.05)' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 13 }}>🎬 {t('detail_drama_heading')}</h4>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{segment.drama_title}</p>
          {videoSource && (
            <a
              href={buildVideoUrl(videoSource.source_url, segment.start_time)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 12, background: 'var(--color-primary)', color: 'white', borderRadius: 20, padding: '8px 16px', fontSize: 12.5, fontWeight: 700, textDecoration: 'none' }}
            >
              ▶ {t('detail_play_original')}
            </a>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
