// Confirmed coordinates from the team's places_coordinates_final.json
// (shared via Slack #원천데이터-수집 2026-08-04, all status: "확정").
// Keyed by place_id so multiple segments at the same place share one pin.
//
// TODO: P030 (창경궁, split out from P017/창덕궁 in the PR #3 metadata fix) has
// no confirmed coordinates yet -- ask 김동현 for it. getMapMarkers.js already
// skips places with no known coordinates, so this is non-breaking in the
// meantime; that segment just won't show a map pin.
export const placeCoordinates = {
  P001: { place_name: '화성행궁', latitude: 37.2827, longitude: 127.0141 },
  P002: { place_name: '여의도공원 이벤트광장', latitude: 37.528391, longitude: 126.934242 },
  P003: { place_name: '수원대학교', latitude: 37.2101, longitude: 126.9793 },
  P004: { place_name: '고창 학원농장', latitude: 35.52353, longitude: 126.53899 },
  P005: { place_name: '전주 한옥마을', latitude: 35.81558, longitude: 127.1498 },
  P006: { place_name: '온빛자연휴양림', latitude: 36.2198, longitude: 127.2985 },
  P007: { place_name: '한벽굴(한벽터널)', latitude: 35.81187, longitude: 127.16081 },
  P008: { place_name: '명진 책 대여점', latitude: 35.8083412217659, longitude: 127.151738441918 },
  P009: { place_name: '오목대', latitude: 35.8143819050269, longitude: 127.154583362895 },
  P010: { place_name: '포항 영일만항', latitude: 36.110470848669, longitude: 129.435298666205 },
  P011: { place_name: '고성오일시장', latitude: 33.45199979768546, longitude: 126.91329816476421 },
  P012: { place_name: '비내섬', latitude: 37.107632452436036, longitude: 127.81772586221321 },
  P013: { place_name: '강릉 주문진방파제', latitude: 37.8798554564007, longitude: 128.834204251177 },
  P014: { place_name: '월정사', latitude: 37.731750824987657, longitude: 128.59212296344094 },
  P015: { place_name: '망상해변', latitude: 37.5933739406532, longitude: 129.090473530107 },
  P016: { place_name: '경복궁', latitude: 37.577613288258206, longitude: 126.97689786832184 },
  P017: { place_name: '창덕궁', latitude: 37.579646947395347, longitude: 126.99099980677127 },
  P018: { place_name: '주천강 섶다리', latitude: 37.2945909669734, longitude: 128.325270948965 },
  P019: { place_name: '함창역', latitude: 36.5696577984383, longitude: 128.174882340074 },
  P020: { place_name: '장항스카이워크', latitude: 36.0184418365009, longitude: 126.66518032365 },
  P021: { place_name: '청계천(청계광장)', latitude: 37.569074693516065, longitude: 126.97759212096156 },
  P022: { place_name: '파라다이스시티호텔', latitude: 37.437245732031954, longitude: 126.45578147120696 },
  P023: { place_name: '포항 구룡포 석병리', latitude: 36.0124611572903, longitude: 129.576737767501 },
  P024: { place_name: '청하공진시장', latitude: 36.197054213048688, longitude: 129.33977153030838 },
  P025: { place_name: '청굴물', latitude: 33.5582918680451, longitude: 126.751157460293 },
  P026: { place_name: '태봉왓', latitude: 33.168348419025243, longitude: 126.27570162962913 },
  P027: { place_name: '금능리 대표 촬영지', latitude: 33.3880061610003, longitude: 126.226042968412 },
  P028: { place_name: '금능포구', latitude: 33.390083168474966, longitude: 126.22823213867693 },
  P029: { place_name: '경천섬공원', latitude: 36.4399243533953, longitude: 128.259711893989 },
}
