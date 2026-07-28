import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import About from './About.jsx'

describe('About', () => {
  it('renders both pipeline sections', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText('영상 처리 파이프라인')).toBeInTheDocument()
    expect(screen.getByText('검색 파이프라인')).toBeInTheDocument()
  })

  it('marks exactly RRF and Query Analysis as pending confirmation', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getAllByText('🔲 확인 필요')).toHaveLength(2)
  })
})
