import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Detail from './Detail.jsx'
import { LanguageProvider } from '../i18n/LanguageContext.jsx'

function renderAt(uid) {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[`/segment/${uid}`]}>
        <Routes>
          <Route path="/segment/:segmentId" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>,
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
          this.setCenter = vi.fn()
          this.relayout = vi.fn()
        }),
        Marker: vi.fn(function Marker() {}),
        InfoWindow: vi.fn(function InfoWindow() {
          this.open = vi.fn()
          this.close = vi.fn()
        }),
        event: { addListener: vi.fn() },
        load: (callback) => callback(),
      },
    }
  })

  it('renders the place name and drama title for a known segment', () => {
    renderAt('keyframes_GOBLIN_01_GOBLIN_01_SCENE_01_jpg')
    expect(screen.getByText('강릉 주문진방파제')).toBeInTheDocument()
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

  it('links to the original video source for the segment', () => {
    renderAt('keyframes_GOBLIN_01_GOBLIN_01_SCENE_01_jpg')
    const link = screen.getByRole('link', { name: /원본 영상 재생/ })
    expect(link).toHaveAttribute('href', 'https://www.youtube.com/watch?v=mCeMgl6rR-U&t=202s')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('derives and links to a play URL for a 517-dataset segment with no videoSources entry', () => {
    renderAt('keyframes_V007_Z7u5SNDq0jw_V007_P031_S002_SCENE_001_jpg')
    const link = screen.getByRole('link', { name: /원본 영상 재생/ })
    expect(link).toHaveAttribute('href', 'https://www.youtube.com/watch?v=Z7u5SNDq0jw&t=0s')
  })

  it('shows the place name in English when the language is switched to en', async () => {
    const user = userEvent.setup()
    renderAt('keyframes_GOBLIN_01_GOBLIN_01_SCENE_01_jpg')
    await user.click(screen.getByRole('button', { name: '메뉴' }))
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText('Jumunjin Breakwater')).toBeInTheDocument()
  })
})
