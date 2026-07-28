import { describe, it, expect } from 'vitest'
import { searchSegments } from './searchSegments.js'

const fixtures = [
  {
    segment_id: 'A',
    season: 'summer',
    spot_name: '연꽃 정원과 오리',
    description: 'A serene pond with lotus blossoms and ducks.',
    mood: ['calm', 'serene'],
    scene_elements: ['lotus_pond', 'ducks', 'water'],
    activity: ['bird_watching'],
  },
  {
    segment_id: 'B',
    season: 'summer',
    spot_name: '숲속 정자',
    description: 'Two people walking through a forested pathway.',
    mood: ['refreshing', 'vibrant'],
    scene_elements: ['trees', 'pathway'],
    activity: ['walking'],
  },
  {
    segment_id: 'C',
    season: 'autumn',
    spot_name: '가을 단풍길',
    description: 'A quiet autumn trail covered in red leaves.',
    mood: ['peaceful'],
    scene_elements: ['leaves', 'trail'],
    activity: ['walking'],
  },
]

describe('searchSegments', () => {
  it('returns all segments when called with no query or filters', () => {
    const result = searchSegments(fixtures, {})
    expect(result).toHaveLength(3)
  })

  it('excludes segments with no matching query terms', () => {
    const result = searchSegments(fixtures, { query: 'lotus pond' })
    expect(result.map((s) => s.segment_id)).toEqual(['A'])
  })

  it('ranks a segment matching more query terms above one matching fewer', () => {
    const result = searchSegments(fixtures, { query: 'walking forested' })
    expect(result[0].segment_id).toBe('B')
  })

  it('filters by season', () => {
    const result = searchSegments(fixtures, { season: 'autumn' })
    expect(result.map((s) => s.segment_id)).toEqual(['C'])
  })

  it('filters by theme keywords, matching if any keyword is present', () => {
    const result = searchSegments(fixtures, { themeKeywords: ['pond', 'water'] })
    expect(result.map((s) => s.segment_id)).toEqual(['A'])
  })

  it('returns an empty array when nothing matches', () => {
    const result = searchSegments(fixtures, { query: 'skyscraper subway' })
    expect(result).toEqual([])
  })

  it('attaches a similarity score to every result', () => {
    const result = searchSegments(fixtures, { query: 'lotus' })
    expect(result[0].similarity).toBeGreaterThan(0)
    expect(result[0].similarity).toBeLessThanOrEqual(1)
  })
})
