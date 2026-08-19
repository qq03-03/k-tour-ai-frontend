import { describe, it, expect } from 'vitest'
import { allSegmentTranslations } from './allSegmentTranslations.js'
import segmentTranslations from './segmentTranslations.json'
import segmentTranslations517 from './segmentTranslations517.json'

describe('allSegmentTranslations', () => {
  it('contains every record from both segmentTranslations.json and segmentTranslations517.json', () => {
    expect(Object.keys(allSegmentTranslations)).toHaveLength(
      Object.keys(segmentTranslations).length + Object.keys(segmentTranslations517).length,
    )
  })

  it('does not lose any original 45-segment record to a key collision', () => {
    for (const key of Object.keys(segmentTranslations)) {
      expect(allSegmentTranslations[key]).toBe(segmentTranslations[key])
    }
  })
})
