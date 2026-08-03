import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Detail from './Detail.jsx'

function renderAt(uid) {
  return render(
    <MemoryRouter initialEntries={[`/segment/${uid}`]}>
      <Routes>
        <Route path="/segment/:segmentId" element={<Detail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Detail', () => {
  it('renders the place name and drama title for a known segment', () => {
    renderAt('keyframes_GOBLIN_01_GOBLIN_01_SCENE_01_jpg')
    expect(screen.getByText('seaside')).toBeInTheDocument()
    expect(screen.getByText('도깨비')).toBeInTheDocument()
  })

  it('renders a not-found message for an unknown uid', () => {
    renderAt('does_not_exist')
    expect(screen.getByText(/찾을 수 없어요/)).toBeInTheDocument()
  })
})
