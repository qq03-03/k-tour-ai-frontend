import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import DramaSection from './DramaSection.jsx'
import { mockSegments } from '../data/mockSegments.js'
import { renderWithLanguage } from '../test-utils.jsx'

describe('DramaSection', () => {
  it('renders real drama titles from mockSegments', () => {
    renderWithLanguage(<MemoryRouter><DramaSection /></MemoryRouter>)
    expect(screen.getByText('폭싹 속았수다')).toBeInTheDocument()
    expect(screen.getByText('도깨비')).toBeInTheDocument()
  })

  it('shows every distinct drama/movie in mockSegments, not just a capped top few', () => {
    renderWithLanguage(<MemoryRouter><DramaSection /></MemoryRouter>)
    const uniqueDramaCount = new Set(mockSegments.map((s) => s.drama_title)).size
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(uniqueDramaCount)
  })

  it('links each drama to its detail page', () => {
    renderWithLanguage(<MemoryRouter><DramaSection /></MemoryRouter>)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/segment\//)
    }
  })

  it('links using the real backend segment_id, not a locally-derived id the API would not recognize', () => {
    // Regression test: Detail.jsx now fetches from the real backend by
    // segment_id (e.g. "V007_P031_S002_SCENE_001"), not the locally-derived
    // `uid` (a sanitized keyframe_path, e.g. "keyframes_V007_..._jpg") that
    // only ever matched local mock data. A link built from the wrong one
    // 404s against the real API with no visible error.
    renderWithLanguage(<MemoryRouter><DramaSection /></MemoryRouter>)
    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/segment\/V\d+_P\w+_S\d+_SCENE_\d+$/)
    }
  })

  it('hides an image without crashing when the image fails to load', () => {
    renderWithLanguage(<MemoryRouter><DramaSection /></MemoryRouter>)
    const [firstImage] = screen.getAllByRole('img')
    fireEvent.error(firstImage)
    expect(firstImage.style.visibility).toBe('hidden')
  })

  it('uses the team-provided main image (drama-images/{video_id prefix}.webp) instead of a scene keyframe', () => {
    renderWithLanguage(<MemoryRouter><DramaSection /></MemoryRouter>)
    const images = screen.getAllByRole('img')
    for (const image of images) {
      expect(image.getAttribute('src')).toMatch(/drama-images\/V\d+\.webp$/)
    }
  })
})
