import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ResultCard from '../components/ResultCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Footer from '../components/Footer.jsx'
import KakaoMap from '../components/KakaoMap.jsx'
import { mockSegments } from '../data/mockSegments.js'
import { themes } from '../data/themes.js'
import { placeCoordinates } from '../data/placeCoordinates.js'
import { searchSegments } from '../lib/searchSegments.js'
import { getMapMarkers } from '../lib/getMapMarkers.js'
import { localizeSegment } from '../lib/localizeSegment.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [showMap, setShowMap] = useState(false)
  const { lang, t } = useLanguage()

  const query = searchParams.get('q') || ''
  const season = searchParams.get('season')
  const themeId = searchParams.get('theme')
  const themeKeywords = themeId ? themes.find((theme) => theme.id === themeId)?.keywords || [] : null

  const results = searchSegments(mockSegments, { query, season, themeKeywords })
  const localizedResults = results.map((segment) => localizeSegment(segment, lang))

  function handleSearch(newQuery) {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`)
  }

  return (
    <div>
      <Header />
      <div style={{ padding: '16px 24px' }}>
        <SearchBar initialValue={query} onSearch={handleSearch} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
        <span style={{ fontSize: 12.5, color: '#64748b' }}>{t('results_count', { n: results.length })}</span>
        <button
          onClick={() => setShowMap((v) => !v)}
          style={{ background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 20, padding: '8px 16px', fontSize: 12.5, fontWeight: 700 }}
        >
          🗺️ {showMap ? t('view_as_list') : t('view_as_map')}
        </button>
      </div>
      {showMap && (
        <div style={{ margin: '14px 24px' }}>
          <KakaoMap markers={getMapMarkers(results, placeCoordinates)} />
        </div>
      )}
      <div style={{ padding: '14px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {localizedResults.length === 0 ? (
          <EmptyState message={t('empty_results_message')} />
        ) : (
          localizedResults.map((segment) => <ResultCard key={segment.uid} segment={segment} />)
        )}
      </div>
      <Footer />
    </div>
  )
}
