import { regionAliases } from '../data/regionAliases.js'

// The real search backend ranks free text by CLIP semantic similarity, which
// doesn't know "경상도" is a colloquial grouping of five separate
// administrative regions -- it just finds text that seems thematically
// related, which can surface unrelated high-scoring results (e.g. searching
// "경상도" returning 경복궁 in Seoul). When the query contains one of these
// grouping terms, return its real region list so the caller can send it as
// a hard filter alongside the free-text query, scoping results to those
// regions regardless of how CLIP would have ranked them.
export function deriveRegionFilterFromQuery(query, aliases = regionAliases) {
  const normalized = query.trim()
  if (!normalized) return null

  for (const group of aliases) {
    if (group.terms.some((term) => normalized.includes(term))) {
      return group.regions
    }
  }

  return null
}
