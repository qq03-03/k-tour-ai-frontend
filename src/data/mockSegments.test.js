import { describe, it, expect } from 'vitest'
import { mockSegments } from './mockSegments.js'

describe('mockSegments', () => {
  it('has exactly 42 entries', () => {
    expect(mockSegments).toHaveLength(42)
  })

  it('has unique uid values (segment_id is not guaranteed unique in this dataset)', () => {
    const uids = mockSegments.map((s) => s.uid)
    expect(new Set(uids).size).toBe(uids.length)
  })

  it('every entry has the required fields', () => {
    const requiredFields = [
      'place_id', 'place_name', 'region', 'drama_title', 'season', 'time_of_day',
      'mood', 'scene_elements', 'activity', 'description', 'segment_id',
      'video_id', 'start_time', 'end_time', 'keyframe_path', 'uid',
    ]
    for (const segment of mockSegments) {
      for (const field of requiredFields) {
        expect(segment[field], `${segment.uid}.${field}`).toBeDefined()
      }
    }
  })

  it('every keyframe_path is a public/-relative path under keyframes/', () => {
    for (const segment of mockSegments) {
      expect(segment.keyframe_path.startsWith('keyframes/')).toBe(true)
    }
  })
})
