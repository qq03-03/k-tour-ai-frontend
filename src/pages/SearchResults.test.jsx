import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchResults from './SearchResults.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </MemoryRouter>,
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
        }),
        Marker: vi.fn(function Marker() {}),
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
})
