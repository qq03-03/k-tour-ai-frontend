// Maps colloquial/historical region groupings to the specific administrative
// region names used in mockSegments.js, so a search for e.g. "경상도" finds
// segments tagged with the modern region name (e.g. "부산광역시") even though
// that exact string never appears in the segment's own text.
export const regionAliases = [
  { terms: ['경상도', '경상권'], regions: ['부산광역시', '대구광역시', '울산광역시', '경상북도', '경상남도'] },
  { terms: ['전라도', '호남'], regions: ['광주광역시', '전북특별자치도', '전라남도'] },
  { terms: ['충청도', '충청권'], regions: ['대전광역시', '세종특별자치시', '충청북도', '충청남도'] },
  { terms: ['수도권'], regions: ['서울특별시', '경기도', '인천광역시'] },
  { terms: ['강원도'], regions: ['강원특별자치도'] },
  { terms: ['제주도'], regions: ['제주특별자치도'] },
]
