import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchResults from './SearchResults.jsx'
import { LanguageProvider } from '../i18n/LanguageContext.jsx'

function renderAt(path) {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('SearchResults', () => {
  beforeEach(() => {
    window.kakao = {
      maps: {
        LatLng: vi.fn(function LatLng() {}),
        LatLngBounds: vi.fn(function LatLngBounds() {
          this.extend = vi.fn()
        }),
        Map: vi.fn(function Map() {
          this.setBounds = vi.fn()
          this.setCenter = vi.fn()
          this.relayout = vi.fn()
        }),
        Marker: vi.fn(function Marker() {}),
        InfoWindow: vi.fn(function InfoWindow() {
          this.open = vi.fn()
          this.close = vi.fn()
        }),
        event: { addListener: vi.fn() },
        load: (callback) => callback(),
      },
    }
  })

  it('shows matching results for a query present in the real mock data', () => {
    // 고창 학원농장 now matches twice: once from the original 45-segment dataset
    // (real image) and once from the 517-segment dataset (namespaced place_id,
    // no image yet) -- this duplication is expected, see
    // docs/superpowers/specs/2026-08-19-517-segment-dataset-integration-design.md.
    renderAt('/search?q=canola')
    expect(screen.getAllByText('고창 학원농장').length).toBeGreaterThan(0)
  })

  it('shows the empty state for a query that matches nothing', () => {
    renderAt('/search?q=submarine spaceship dinosaur')
    expect(screen.getByText(/검색 결과가 없어요/)).toBeInTheDocument()
  })

  it('filters by season from the URL', () => {
    // 284 of the 562 total segments match season=summer after the 517-segment
    // dataset was added (vs. a handful out of 45 before), so this renders far
    // more ResultCards than before and needs more time under full-suite load.
    renderAt('/search?season=summer')
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
  }, 15000)

  it('shows only one card per place when filtering by season, even if the place has many matching segments', () => {
    // 경복궁 (place_id N-P016) has 27 separate summer-matching segments in the
    // 517 dataset; without dedup this page would render 27 near-identical cards.
    renderAt('/search?season=summer')
    const links = screen.getAllByRole('link')
    const hrefs = links.map((link) => link.getAttribute('href'))
    const gyeongbokLinks = hrefs.filter((href) => href.includes('V011_Nba1McqxPEo'))
    expect(gyeongbokLinks.length).toBeLessThanOrEqual(1)
  }, 15000)

  it('does not dedupe by place for a plain text search with no season filter', () => {
    renderAt('/search?q=%EA%B2%BD%EB%B3%B5%EA%B6%81')
    const links = screen.getAllByRole('link')
    const hrefs = links.map((link) => link.getAttribute('href'))
    const gyeongbokLinks = hrefs.filter((href) => href.includes('V011_Nba1McqxPEo'))
    expect(gyeongbokLinks.length).toBeGreaterThan(1)
  })

  it('shows a map with markers when "지도로 보기" is clicked', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=palace')
    await user.click(screen.getByText('🗺️ 지도로 보기'))
    expect(window.kakao.maps.Map).toHaveBeenCalledTimes(1)
    expect(window.kakao.maps.Marker).toHaveBeenCalled()
  })

  it('shows results in English when the language is switched to en', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=canola')
    await user.click(screen.getByRole('button', { name: '메뉴' }))
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(await screen.findByText('Hagwon Tourist Farm')).toBeInTheDocument()
  })
})
