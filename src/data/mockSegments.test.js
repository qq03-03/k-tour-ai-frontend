import { describe, it, expect } from 'vitest'
import { mockSegments } from './mockSegments.js'

describe('mockSegments', () => {
  it('has exactly 10 entries', () => {
    expect(mockSegments).toHaveLength(10)
  })

  it('has unique segment_id values', () => {
    const ids = mockSegments.map((s) => s.segment_id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every entry has the required fields', () => {
    const requiredFields = [
      'place_name', 'season', 'time_of_day', 'mood', 'scene_elements',
      'activity', 'description', 'segment_id', 'video_id', 'spot_name',
      'start_time', 'end_time', 'keyframe_path',
    ]
    for (const segment of mockSegments) {
      for (const field of requiredFields) {
        expect(segment[field], `${segment.segment_id}.${field}`).toBeDefined()
      }
    }
  })

  it('every keyframe_path points under /keyframes/', () => {
    for (const segment of mockSegments) {
      expect(segment.keyframe_path.startsWith('/keyframes/')).toBe(true)
    }
  })
})
