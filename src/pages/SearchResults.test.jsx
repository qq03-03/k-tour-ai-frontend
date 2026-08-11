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
    renderAt('/search?q=canola')
    expect(screen.getByText('고창 학원농장')).toBeInTheDocument()
  })

  it('shows the empty state for a query that matches nothing', () => {
    renderAt('/search?q=submarine spaceship dinosaur')
    expect(screen.getByText(/검색 결과가 없어요/)).toBeInTheDocument()
  })

  it('filters by season from the URL', () => {
    renderAt('/search?season=summer')
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
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
