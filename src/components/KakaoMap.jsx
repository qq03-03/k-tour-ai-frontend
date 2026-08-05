import { useEffect, useRef } from 'react'

const KAKAO_SDK_SRC = 'https://dapi.kakao.com/v2/maps/sdk.js'

function loadKakaoSdk(appKey) {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao)
      return
    }
    let script = document.querySelector('script[data-kakao-map-sdk]')
    if (!script) {
      script = document.createElement('script')
      script.src = `${KAKAO_SDK_SRC}?appkey=${appKey}&autoload=false`
      script.dataset.kakaoMapSdk = 'true'
      script.onerror = reject
      document.head.appendChild(script)
    }
    script.addEventListener('load', () => window.kakao.maps.load(() => resolve(window.kakao)))
  })
}

export default function KakaoMap({ markers }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (markers.length === 0 || !containerRef.current) return

    let cancelled = false
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY

    loadKakaoSdk(appKey).then((kakao) => {
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
    })

    return () => {
      cancelled = true
    }
  }, [markers])

  if (markers.length === 0) {
    return (
      <div style={{ height: 200, borderRadius: 16, background: '#eef2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
        🗺️ 지도에 표시할 위치 정보가 없어요.
      </div>
    )
  }

  return <div ref={containerRef} style={{ width: '100%', height: 260, borderRadius: 16, overflow: 'hidden' }} />
}
