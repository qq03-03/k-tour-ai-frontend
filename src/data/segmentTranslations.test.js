import { describe, it, expect } from 'vitest'
import segmentTranslations from './segmentTranslations.json'
import { allSegmentTranslations } from './allSegmentTranslations.js'
import { mockSegments } from './mockSegments.js'

describe('segmentTranslations', () => {
  it('has exactly 45 records', () => {
    expect(Object.keys(segmentTranslations)).toHaveLength(45)
  })

  it('has a record in allSegmentTranslations for every mockSegments entry (45 original + 517 new), keyed by segment_id__segment_id', () => {
    for (const segment of mockSegments) {
      const keyframeId = `${segment.segment_id}__${segment.segment_id}`
      expect(allSegmentTranslations[keyframeId], keyframeId).toBeDefined()
    }
  })

  it('every record has all 4 languages with the required fields', () => {
    const requiredFields = [
      'drama_title', 'place_name', 'region', 'season', 'time_of_day',
      'description', 'mood', 'activity', 'scene_elements',
    ]
    for (const [keyframeId, record] of Object.entries(segmentTranslations)) {
      for (const lang of ['ko', 'en', 'ja', 'zh']) {
        expect(record[lang], `${keyframeId}.${lang}`).toBeDefined()
        for (const field of requiredFields) {
          expect(record[lang][field], `${keyframeId}.${lang}.${field}`).toBeDefined()
        }
      }
    }
  })

  it('applies the human-review override for GOBLIN_01_SCENE_01 description', () => {
    const record = segmentTranslations['GOBLIN_01_SCENE_01__GOBLIN_01_SCENE_01']
    expect(record.ko.description).toBe(
      '사람들이 해변의 바위 위에 서서 바다를 바라보며 조용히 대화를 나누는 장면입니다.',
    )
  })
})
