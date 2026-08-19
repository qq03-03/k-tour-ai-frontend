import { describe, it, expect } from 'vitest'
import { placeCoordinates517 } from './placeCoordinates517.js'

describe('placeCoordinates517', () => {
  it('has exactly 74 entries', () => {
    expect(Object.keys(placeCoordinates517)).toHaveLength(74)
  })

  it('prefixes every key with N-', () => {
    for (const key of Object.keys(placeCoordinates517)) {
      expect(key.startsWith('N-'), key).toBe(true)
    }
  })

  it('every entry has a place_name and numeric coordinates', () => {
    for (const [key, coord] of Object.entries(placeCoordinates517)) {
      expect(typeof coord.place_name, key).toBe('string')
      expect(typeof coord.latitude, key).toBe('number')
      expect(typeof coord.longitude, key).toBe('number')
    }
  })
})
