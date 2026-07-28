import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
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
  it('shows matching results for a query present in the real mock data', () => {
    renderAt('/search?q=lotus')
    expect(screen.getByText('연꽃 정원과 오리')).toBeInTheDocument()
  })

  it('shows the empty state for a query that matches nothing', () => {
    renderAt('/search?q=skyscraper subway station')
    expect(screen.getByText(/검색 결과가 없어요/)).toBeInTheDocument()
  })

  it('filters by season from the URL', () => {
    renderAt('/search?season=summer')
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
  })
})
