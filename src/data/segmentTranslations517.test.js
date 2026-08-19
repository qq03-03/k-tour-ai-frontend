import { describe, it, expect } from 'vitest'
import segmentTranslations517 from './segmentTranslations517.json'
import { rawSegments517 } from './mockSegments517.js'

describe('segmentTranslations517', () => {
  it('has exactly 517 records', () => {
    expect(Object.keys(segmentTranslations517)).toHaveLength(517)
  })

  it('has a record for every mockSegments517 entry, keyed by segment_id__segment_id', () => {
    for (const segment of rawSegments517) {
      const keyframeId = `${segment.segment_id}__${segment.segment_id}`
      expect(segmentTranslations517[keyframeId], keyframeId).toBeDefined()
    }
  })

  it('every record has all 4 languages with the required fields', () => {
    const requiredFields = [
      'drama_title', 'place_name', 'region', 'season', 'time_of_day',
      'description', 'mood', 'activity', 'scene_elements',
    ]
    for (const [keyframeId, record] of Object.entries(segmentTranslations517)) {
      for (const lang of ['ko', 'en', 'ja', 'zh']) {
        expect(record[lang], `${keyframeId}.${lang}`).toBeDefined()
        for (const field of requiredFields) {
          expect(record[lang][field], `${keyframeId}.${lang}.${field}`).toBeDefined()
        }
      }
    }
  })
})
