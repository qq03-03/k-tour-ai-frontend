import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import DramaSection from './DramaSection.jsx'

describe('DramaSection', () => {
  it('renders real drama titles from mockSegments', () => {
    render(<MemoryRouter><DramaSection /></MemoryRouter>)
    expect(screen.getByText('폭싹 속았수다')).toBeInTheDocument()
    expect(screen.getByText('도깨비')).toBeInTheDocument()
  })

  it('links each drama to its detail page', () => {
    render(<MemoryRouter><DramaSection /></MemoryRouter>)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/segment\//)
    }
  })
})
