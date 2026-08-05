import { describe, it, expect } from 'vitest'
import { getMapMarkers } from './getMapMarkers.js'

const coordinates = {
  P001: { place_name: '경복궁', latitude: 37.5776, longitude: 126.9769 },
  P002: { place_name: '망상해변', latitude: 37.5934, longitude: 129.0905 },
}

const segments = [
  { uid: 'a', place_id: 'P001', place_name: 'Gyeongbokgung Palace' },
  { uid: 'b', place_id: 'P001', place_name: 'Gyeongbokgung Palace' },
  { uid: 'c', place_id: 'P002', place_name: 'Mang Island' },
]

describe('getMapMarkers', () => {
  it('returns one marker per unique place_id', () => {
    const result = getMapMarkers(segments, coordinates)
    expect(result).toHaveLength(2)
  })

  it('attaches latitude/longitude from the coordinates lookup', () => {
    const result = getMapMarkers(segments, coordinates)
    const gyeongbokgung = result.find((m) => m.place_id === 'P001')
    expect(gyeongbokgung.latitude).toBe(37.5776)
    expect(gyeongbokgung.longitude).toBe(126.9769)
  })

  it('uses the coordinates place_name as the marker label', () => {
    const result = getMapMarkers(segments, coordinates)
    const gyeongbokgung = result.find((m) => m.place_id === 'P001')
    expect(gyeongbokgung.label).toBe('경복궁')
  })

  it('skips segments whose place_id has no known coordinates', () => {
    const withUnknown = [...segments, { uid: 'd', place_id: 'P999', place_name: 'Unknown' }]
    const result = getMapMarkers(withUnknown, coordinates)
    expect(result.every((m) => m.place_id !== 'P999')).toBe(true)
  })

  it('returns an empty array for no segments', () => {
    expect(getMapMarkers([], coordinates)).toEqual([])
  })
})
