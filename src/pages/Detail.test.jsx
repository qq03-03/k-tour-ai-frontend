import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
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

  it('renders the place name and drama title for a known segment', () => {
    renderAt('keyframes_GOBLIN_01_GOBLIN_01_SCENE_01_jpg')
    expect(screen.getByText('강릉 주문진')).toBeInTheDocument()
    expect(screen.getByText('도깨비')).toBeInTheDocument()
  })

  it('renders a map marker for the segment\'s place', async () => {
    renderAt('keyframes_GOBLIN_01_GOBLIN_01_SCENE_01_jpg')
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(window.kakao.maps.Marker).toHaveBeenCalledTimes(1)
  })

  it('renders a not-found message for an unknown uid', () => {
    renderAt('does_not_exist')
    expect(screen.getByText(/찾을 수 없어요/)).toBeInTheDocument()
  })
})
