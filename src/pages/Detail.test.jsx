import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Detail from './Detail.jsx'

function renderAt(segmentId) {
  return render(
    <MemoryRouter initialEntries={[`/segment/${segmentId}`]}>
      <Routes>
        <Route path="/segment/:segmentId" element={<Detail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Detail', () => {
  it('renders the spot name and source video title for a known segment', () => {
    renderAt('SEG_NAMI_02_02')
    expect(screen.getByText('연꽃 정원과 오리')).toBeInTheDocument()
    expect(screen.getByText('Today is your Nami Island')).toBeInTheDocument()
  })

  it('renders a not-found message for an unknown segment id', () => {
    renderAt('SEG_DOES_NOT_EXIST')
    expect(screen.getByText(/찾을 수 없어요/)).toBeInTheDocument()
  })
})
