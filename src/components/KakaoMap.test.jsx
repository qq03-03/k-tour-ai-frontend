import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import KakaoMap from './KakaoMap.jsx'

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

const oneMarker = [{ place_id: 'P001', label: '경복궁', latitude: 37.5, longitude: 127.0 }]

describe('KakaoMap', () => {
  beforeEach(() => {
    delete window.kakao
  })

  afterEach(() => {
    vi.useRealTimers()
    document.querySelectorAll('script[data-kakao-map-sdk]').forEach((s) => s.remove())
  })

  it('shows an empty message when there are no markers', () => {
    render(<KakaoMap markers={[]} />)
    expect(screen.getByText(/지도에 표시할 위치 정보가 없어요/)).toBeInTheDocument()
  })

  it('shows a loading message before the SDK resolves', () => {
    render(<KakaoMap markers={oneMarker} />)
    expect(screen.getByText(/지도를 불러오는 중/)).toBeInTheDocument()
  })

  it('renders a map once the SDK loads', async () => {
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
        load: (callback) => callback(),
      },
    }
    render(<KakaoMap markers={oneMarker} />)
    await flushPromises()
    expect(window.kakao.maps.Map).toHaveBeenCalledTimes(1)
    expect(screen.queryByText(/지도를 불러오는 중/)).not.toBeInTheDocument()
  })

  it('relays out the map so a container mis-measured at creation time re-fits', async () => {
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
        load: (callback) => callback(),
      },
    }
    render(<KakaoMap markers={oneMarker} />)
    await flushPromises()
    const mapInstance = window.kakao.maps.Map.mock.results[0].value
    expect(mapInstance.relayout).toHaveBeenCalled()
    expect(mapInstance.setCenter).toHaveBeenCalled()
  })

  it('shows an error message and a retry button when the SDK script fails to load', async () => {
    render(<KakaoMap markers={oneMarker} />)
    const script = document.querySelector('script[data-kakao-map-sdk]')
    script.dispatchEvent(new Event('error'))
    await waitFor(() => {
      expect(screen.getByText(/지도를 불러오지 못했어요/)).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /다시 시도/ })).toBeInTheDocument()
  })

  it('shows an error message if the SDK never responds within the timeout', async () => {
    vi.useFakeTimers()
    render(<KakaoMap markers={oneMarker} timeoutMs={5000} />)
    await vi.advanceTimersByTimeAsync(5001)
    await vi.advanceTimersByTimeAsync(0)
    expect(screen.getByText(/지도를 불러오지 못했어요/)).toBeInTheDocument()
  })

  it('retries loading when the retry button is clicked', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    render(<KakaoMap markers={oneMarker} />)
    const script = document.querySelector('script[data-kakao-map-sdk]')
    script.dispatchEvent(new Event('error'))
    await waitFor(() => screen.getByRole('button', { name: /다시 시도/ }))

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
        load: (callback) => callback(),
      },
    }
    await user.click(screen.getByRole('button', { name: /다시 시도/ }))
    await flushPromises()
    expect(window.kakao.maps.Map).toHaveBeenCalledTimes(1)
  })
})
