import { render, screen, fireEvent } from '@testing-library/react'
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
    renderAt('keyframes_V007_Z7u5SNDq0jw_V007_P031_S002_SCENE_001_jpg')
    expect(screen.getByText('충주 중앙탑공원')).toBeInTheDocument()
    expect(screen.getByText('사랑의 불시착')).toBeInTheDocument()
  })

  it('renders a map marker for the segment\'s place', async () => {
    renderAt('keyframes_V007_Z7u5SNDq0jw_V007_P031_S002_SCENE_001_jpg')
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(window.kakao.maps.Marker).toHaveBeenCalledTimes(1)
  })

  it('renders a not-found message for an unknown uid', () => {
    renderAt('does_not_exist')
    expect(screen.getByText(/찾을 수 없어요/)).toBeInTheDocument()
  })

  it('derives and links to the original YouTube video from the segment\'s video_id', () => {
    renderAt('keyframes_V007_Z7u5SNDq0jw_V007_P031_S002_SCENE_001_jpg')
    const link = screen.getByRole('link', { name: /원본 영상 재생/ })
    expect(link).toHaveAttribute('href', 'https://www.youtube.com/watch?v=Z7u5SNDq0jw&t=0s')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('shows the detailed street address for a place that has one, instead of just the region', () => {
    renderAt('keyframes_V007_Z7u5SNDq0jw_V007_P031_S002_SCENE_001_jpg')
    expect(screen.getByText(/충북 충주시 중앙탑면 탑정안길 6/)).toBeInTheDocument()
  })

  it('falls back to the region when the place has no detailed address', () => {
    renderAt('keyframes_V001_nypQChEVN0c_V001_P001_S001_SCENE_001_jpg')
    expect(screen.getByText(/경기도/)).toBeInTheDocument()
  })

  it('shows the place name in English when the language is switched to en', async () => {
    const user = userEvent.setup()
    renderAt('keyframes_V007_Z7u5SNDq0jw_V007_P031_S002_SCENE_001_jpg')
    await user.click(screen.getByRole('button', { name: '메뉴' }))
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText('Chungju Jungangtap Park')).toBeInTheDocument()
  })

  it('hides the image without crashing when the keyframe fails to load', () => {
    renderAt('keyframes_V007_Z7u5SNDq0jw_V007_P031_S002_SCENE_001_jpg')
    const img = screen.getByRole('img', { name: '충주 중앙탑공원' })
    fireEvent.error(img)
    expect(img.style.visibility).toBe('hidden')
  })
})
