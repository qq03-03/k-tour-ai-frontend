import { allSegmentTranslations } from '../data/allSegmentTranslations.js'

const LOCALIZABLE_FIELDS = [
  'drama_title', 'place_name', 'region', 'season', 'time_of_day',
  'description', 'mood', 'activity', 'scene_elements',
]

export function localizeSegment(segment, lang, translations = allSegmentTranslations) {
  const keyframeId = `${segment.segment_id}__${segment.segment_id}`
  const record = translations[keyframeId]
  const localized = record?.[lang] ?? record?.ko
  if (!localized) return segment

  const result = { ...segment }
  for (const field of LOCALIZABLE_FIELDS) {
    result[field] = localized[field] ?? segment[field]
  }
  return result
}
