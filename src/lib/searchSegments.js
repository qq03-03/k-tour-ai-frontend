function buildSearchText(segment) {
  return [
    segment.spot_name,
    segment.description,
    ...(segment.mood || []),
    ...(segment.scene_elements || []),
    ...(segment.activity || []),
  ]
    .join(' ')
    .toLowerCase()
}

function scoreSegment(segment, query) {
  if (!query || !query.trim()) return 1
  const text = buildSearchText(segment)
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return 1
  const matched = terms.filter((term) => text.includes(term))
  return matched.length / terms.length
}

function matchesTheme(segment, themeKeywords) {
  if (!themeKeywords || themeKeywords.length === 0) return true
  const text = buildSearchText(segment)
  return themeKeywords.some((keyword) => text.includes(keyword.toLowerCase()))
}

export function searchSegments(segments, { query = '', season = null, themeKeywords = [] } = {}) {
  return segments
    .filter((segment) => !season || segment.season === season)
    .filter((segment) => matchesTheme(segment, themeKeywords))
    .map((segment) => ({ ...segment, similarity: scoreSegment(segment, query) }))
    .filter((segment) => segment.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
}
