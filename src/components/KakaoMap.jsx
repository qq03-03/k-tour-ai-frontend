import { useEffect, useRef, useState } from 'react'

const KAKAO_SDK_SRC = 'https://dapi.kakao.com/v2/maps/sdk.js'
const DEFAULT_TIMEOUT_MS = 8000

function loadKakaoSdk(appKey, timeoutMs) {
  const loadPromise = new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao)
      return
    }
    // Always start from a fresh <script> tag. Reusing one whose load/error
    // event already fired (e.g. on retry after a failure) would never
    // resolve, since those events don't replay for newly added listeners.
    document.querySelectorAll('script[data-kakao-map-sdk]').forEach((old) => old.remove())
    const script = document.createElement('script')
    // Cache-bust: this app's Kakao service was disabled for part of testing,
    // during which some clients cached an error response for this exact URL.
    // A stable query string could keep serving that stale cached response
    // (which trips ERR_BLOCKED_BY_ORB); a per-load timestamp forces a fresh
    // fetch every time.
    script.src = `${KAKAO_SDK_SRC}?appkey=${appKey}&autoload=false&_=${Date.now()}`
    script.dataset.kakaoMapSdk = 'true'
    script.addEventListener('load', () => window.kakao.maps.load(() => resolve(window.kakao)))
    script.addEventListener('error', () => reject(new Error('Failed to load Kakao Maps SDK')))
    document.head.appendChild(script)
  })

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timed out loading Kakao Maps SDK')), timeoutMs)
  })

  return Promise.race([loadPromise, timeoutPromise])
}

export default function KakaoMap({ markers, timeoutMs = DEFAULT_TIMEOUT_MS }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (markers.length === 0) return

    let cancelled = false
    setStatus('loading')
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY

    loadKakaoSdk(appKey, timeoutMs)
      .then((kakao) => {
        if (cancelled || !containerRef.current) return

        const center = new kakao.maps.LatLng(markers[0].latitude, markers[0].longitude)
        const map = new kakao.maps.Map(containerRef.current, { center, level: 8 })
        const bounds = new kakao.maps.LatLngBounds()

        markers.forEach((marker) => {
          const position = new kakao.maps.LatLng(marker.latitude, marker.longitude)
          new kakao.maps.Marker({ map, position, title: marker.label })
          bounds.extend(position)
        })

        if (markers.length > 1) map.setBounds(bounds)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [markers, timeoutMs, retryCount])

  if (markers.length === 0) {
    return (
      <div style={{ height: 200, borderRadius: 16, background: '#eef2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
        🗺️ 지도에 표시할 위치 정보가 없어요.
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={{ height: 200, borderRadius: 16, background: '#eef2f7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#94a3b8', fontSize: 13 }}>
        <span>🗺️ 지도를 불러오지 못했어요. 네트워크 상태를 확인해주세요.</span>
        <button
          onClick={() => setRetryCount((n) => n + 1)}
          style={{ border: 'none', background: 'var(--color-primary)', color: 'white', borderRadius: 20, padding: '8px 16px', fontSize: 12.5, fontWeight: 700 }}
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      {status === 'loading' && (
        <div style={{ height: 260, borderRadius: 16, background: '#eef2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
          지도를 불러오는 중...
        </div>
      )}
      <div
        ref={containerRef}
        style={{ width: '100%', height: 260, borderRadius: 16, overflow: 'hidden', display: status === 'ready' ? 'block' : 'none' }}
      />
    </div>
  )
}
