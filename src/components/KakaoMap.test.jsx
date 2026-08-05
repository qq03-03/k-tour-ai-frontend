import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import KakaoMap from './KakaoMap.jsx'

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

describe('KakaoMap', () => {
  beforeEach(() => {
    window.kakao = {
      maps: {
        LatLng: vi.fn(function LatLng(lat, lng) {
          this.lat = lat
          this.lng = lng
        }),
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

  it('shows an empty message when there are no markers', () => {
    render(<KakaoMap markers={[]} />)
    expect(screen.getByText(/지도에 표시할 위치 정보가 없어요/)).toBeInTheDocument()
  })

  it('renders a map when markers are provided', async () => {
    const markers = [{ place_id: 'P001', label: '경복궁', latitude: 37.5, longitude: 127.0 }]
    render(<KakaoMap markers={markers} />)
    await flushPromises()
    expect(window.kakao.maps.Map).toHaveBeenCalledTimes(1)
  })

  it('creates one marker per entry in markers', async () => {
    const markers = [
      { place_id: 'P001', label: 'A', latitude: 1, longitude: 1 },
      { place_id: 'P002', label: 'B', latitude: 2, longitude: 2 },
    ]
    render(<KakaoMap markers={markers} />)
    await flushPromises()
    expect(window.kakao.maps.Marker).toHaveBeenCalledTimes(2)
  })

  it('fits bounds to all markers when there is more than one', async () => {
    const markers = [
      { place_id: 'P001', label: 'A', latitude: 1, longitude: 1 },
      { place_id: 'P002', label: 'B', latitude: 2, longitude: 2 },
    ]
    render(<KakaoMap markers={markers} />)
    await flushPromises()
    const mapInstance = window.kakao.maps.Map.mock.results[0].value
    expect(mapInstance.setBounds).toHaveBeenCalledTimes(1)
  })
})
