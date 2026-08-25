import { mapSearchResponse } from './mapSearchResponse.js'

function baseUrl() {
  const url = import.meta.env.VITE_API_BASE_URL
  if (!url) throw new Error('VITE_API_BASE_URL이 설정되어 있지 않아요.')
  return url
}

export async function searchSegmentsApi({ query, filters = {}, topK }) {
  const response = await fetch(`${baseUrl()}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, ...filters, ...(topK ? { top_k: topK } : {}) }),
  }).catch(() => {
    throw new Error('검색 요청 실패: 네트워크 오류')
  })

  if (!response.ok) {
    throw new Error(`검색 요청 실패: ${response.status}`)
  }

  const data = await response.json()
  return mapSearchResponse(data.results)
}

export async function getSegmentByIdApi(segmentId) {
  const response = await fetch(`${baseUrl()}/api/segments/${encodeURIComponent(segmentId)}`, {
    method: 'GET',
  })

  if (response.status === 404) return undefined
  if (!response.ok) {
    throw new Error(`상세 정보 요청 실패: ${response.status}`)
  }

  const data = await response.json()
  return {
    uid: data.segment_id,
    segment_id: data.segment_id,
    video_id: data.video_id,
    place_id: data.place_id,
    place_name: data.place_name,
    region: data.region,
    city: data.city,
    drama_title: data.drama_title,
    start_time: data.start_time,
    end_time: data.end_time,
    season: data.season,
    time_of_day: data.time_of_day,
    description: data.description,
    mood: data.mood,
    activity: data.activity,
    scene_elements: data.scene_elements,
    keyframe_path: data.keyframe_path,
  }
}
