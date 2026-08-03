import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ResultCard from '../components/ResultCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Footer from '../components/Footer.jsx'
import { mockSegments } from '../data/mockSegments.js'
import { themes } from '../data/themes.js'
import { searchSegments } from '../lib/searchSegments.js'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [showMap, setShowMap] = useState(false)

  const query = searchParams.get('q') || ''
  const season = searchParams.get('season')
  const themeId = searchParams.get('theme')
  const themeKeywords = themeId ? themes.find((t) => t.id === themeId)?.keywords || [] : null

  const results = searchSegments(mockSegments, { query, season, themeKeywords })

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
        <span style={{ fontSize: 12.5, color: '#64748b' }}>검색 결과 {results.length}건</span>
        <button
          onClick={() => setShowMap((v) => !v)}
          style={{ background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 20, padding: '8px 16px', fontSize: 12.5, fontWeight: 700 }}
        >
          🗺️ {showMap ? '리스트로 보기' : '지도로 보기'}
        </button>
      </div>
      {showMap && (
        <div style={{ margin: '14px 24px', height: 200, borderRadius: 16, background: '#eef2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
          🗺️ 지도 연동 예정 (스펙 §9 범위 밖)
        </div>
      )}
      <div style={{ padding: '14px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {results.length === 0 ? (
          <EmptyState message="검색 결과가 없어요. 다른 검색어를 시도해보세요." />
        ) : (
          results.map((segment) => <ResultCard key={segment.uid} segment={segment} />)
        )}
      </div>
      <Footer />
    </div>
  )
}
