import { describe, it, expect } from 'vitest'
import { placeCoordinates } from './placeCoordinates.js'

describe('placeCoordinates', () => {
  it('merges the original 30 entries with the 74 namespaced 517-dataset entries with no key collisions', () => {
    expect(Object.keys(placeCoordinates)).toHaveLength(104)
  })

  it('keeps the original place_id keys unprefixed and the 517-dataset keys prefixed with N-', () => {
    const prefixed = Object.keys(placeCoordinates).filter((key) => key.startsWith('N-'))
    const unprefixed = Object.keys(placeCoordinates).filter((key) => !key.startsWith('N-'))
    expect(prefixed).toHaveLength(74)
    expect(unprefixed).toHaveLength(30)
  })
})
