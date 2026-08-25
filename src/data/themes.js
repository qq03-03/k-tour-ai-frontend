// keywords are joined into one natural-language query sent to the real
// search backend (see SearchResults.jsx), which matches by CLIP semantic
// similarity, not literal text presence. An empty array is honest: no
// keywords have been confirmed to return real matches yet, so it correctly
// shows zero results instead of guessing.
export const themes = [
  { id: 'night-view', icon: '🌃', label: { ko: '야경', en: 'Night View', ja: '夜景', zh: '夜景' }, keywords: ['night', 'skyscrapers', 'light trails', 'lighting'] },
  { id: 'drive', icon: '🚗', label: { ko: '드라이브', en: 'Drive', ja: 'ドライブ', zh: '自驾游' }, keywords: ['driving', 'bus', 'road', '드라이브'] },
  { id: 'cherry-blossom', icon: '🌸', label: { ko: '꽃', en: 'Flower', ja: '花', zh: '花' }, keywords: ['cherry blossom', 'spring flowers', 'blooming trees'] },
  { id: 'autumn-leaves', icon: '🍁', label: { ko: '단풍', en: 'Autumn Leaves', ja: '紅葉', zh: '红叶' }, keywords: ['autumn'] },
  { id: 'beach', icon: '🏖', label: { ko: '해변', en: 'Beach', ja: 'ビーチ', zh: '海滩' }, keywords: ['beach', 'ocean', 'sea'] },
  { id: 'traditional', icon: '🏯', label: { ko: '전통', en: 'Traditional', ja: '伝統', zh: '传统' }, keywords: ['hanok', 'palace', 'traditional', '전통', '한옥'] },
  { id: 'field', icon: '🌾', label: { ko: '들판', en: 'Field', ja: '野原', zh: '田野' }, keywords: ['field', 'grass', 'meadow', '휴양림', '자연 풍경'] },
]
