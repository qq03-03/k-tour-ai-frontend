import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ResultCard from './ResultCard.jsx'

const segment = {
  segment_id: 'SEG_NAMI_02_02',
  spot_name: '연꽃 정원과 오리',
  description: 'A serene pond with lotus blossoms and ducks.',
  start_time: 8.13,
  end_time: 17.33,
  keyframe_path: '/keyframes/SEG_NAMI_02_02.jpg',
  similarity: 0.92,
}

describe('ResultCard', () => {
  it('renders the spot name and similarity percentage', () => {
    render(<MemoryRouter><ResultCard segment={segment} /></MemoryRouter>)
    expect(screen.getByText('연꽃 정원과 오리')).toBeInTheDocument()
    expect(screen.getByText('92%')).toBeInTheDocument()
  })

  it('links to the detail page for this segment', () => {
    render(<MemoryRouter><ResultCard segment={segment} /></MemoryRouter>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/segment/SEG_NAMI_02_02')
  })
})
