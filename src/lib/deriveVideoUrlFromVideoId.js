// 517-dataset video_id values are "{prefix}_{youtubeId}" (e.g. "V007_Z7u5SNDq0jw"),
// confirmed via regex against all 517 records in metadata_517_yonghwasan_v2.json --
// see docs/superpowers/specs/2026-08-19-517-segment-dataset-integration-design.md.
// Old-style video_ids (e.g. "GOBLIN_01") have no embedded youtube_id and must
// go through videoSources.js instead -- this returns null for those.
const VIDEO_ID_PATTERN = /^V\d+_(.+)$/

export function deriveVideoUrlFromVideoId(videoId) {
  const match = VIDEO_ID_PATTERN.exec(videoId)
  if (!match) return null
  return `https://www.youtube.com/watch?v=${match[1]}`
}
