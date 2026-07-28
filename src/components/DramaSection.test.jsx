import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DramaSection from './DramaSection.jsx'

describe('DramaSection', () => {
  it('renders all drama titles', () => {
    render(<DramaSection />)
    expect(screen.getByText('도깨비')).toBeInTheDocument()
    expect(screen.getByText('웰컴 투 삼달리')).toBeInTheDocument()
    expect(screen.getByText('미스터 션샤인')).toBeInTheDocument()
  })
})
