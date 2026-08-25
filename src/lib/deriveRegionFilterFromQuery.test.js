import { describe, it, expect } from 'vitest'
import { deriveRegionFilterFromQuery } from './deriveRegionFilterFromQuery.js'

describe('deriveRegionFilterFromQuery', () => {
  it('returns the region list for a recognized colloquial grouping', () => {
    expect(deriveRegionFilterFromQuery('경상도')).toEqual([
      '부산광역시', '대구광역시', '울산광역시', '경상북도', '경상남도',
    ])
  })

  it('matches the term as a substring of a longer query', () => {
    expect(deriveRegionFilterFromQuery('경상도 가을 여행지')).toEqual([
      '부산광역시', '대구광역시', '울산광역시', '경상북도', '경상남도',
    ])
  })

  it('matches an alternate term for the same grouping', () => {
    expect(deriveRegionFilterFromQuery('경상권 벚꽃')).toEqual([
      '부산광역시', '대구광역시', '울산광역시', '경상북도', '경상남도',
    ])
  })

  it('returns null for a query with no recognized region grouping', () => {
    expect(deriveRegionFilterFromQuery('가을 단풍길')).toBeNull()
  })

  it('returns null for an empty or whitespace-only query', () => {
    expect(deriveRegionFilterFromQuery('')).toBeNull()
    expect(deriveRegionFilterFromQuery('   ')).toBeNull()
  })

  it('does not match a literal administrative region name that already exists on its own', () => {
    // "경상북도" is already a real, exact region -- it should be sent as
    // free-text query and let the backend match it directly, not rewritten
    // through the colloquial-grouping path.
    expect(deriveRegionFilterFromQuery('경상북도')).toBeNull()
  })
})
