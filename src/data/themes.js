// keywords map each tag onto real place_name/drama_title/description/mood/
// scene_elements/activity text in mockSegments.js. An empty array is honest:
// no matching data exists yet for that tag, so it correctly returns zero
// results (see lib/searchSegments.js matchesTheme) instead of fabricating
// matches or silently showing everything.
export const themes = [
  { id: 'night-view', icon: '🌃', label: { ko: '야경', en: 'Night View', ja: '夜景', zh: '夜景' }, keywords: ['night', 'skyscrapers', 'light trails', 'lighting'] },
  { id: 'drive', icon: '🚗', label: { ko: '드라이브', en: 'Drive', ja: 'ドライブ', zh: '自驾游' }, keywords: ['driving', 'bus', 'road'] },
  { id: 'cherry-blossom', icon: '🌸', label: { ko: '벚꽃', en: 'Cherry Blossom', ja: '桜', zh: '樱花' }, keywords: [] },
  { id: 'autumn-leaves', icon: '🍁', label: { ko: '단풍', en: 'Autumn Leaves', ja: '紅葉', zh: '红叶' }, keywords: ['autumn'] },
  { id: 'beach', icon: '🏖', label: { ko: '해변', en: 'Beach', ja: 'ビーチ', zh: '海滩' }, keywords: ['beach', 'ocean', 'sea'] },
  { id: 'drama', icon: '🎬', label: { ko: '드라마', en: 'Drama', ja: 'ドラマ', zh: '电视剧' }, keywords: ['hanok', 'palace', 'traditional'] },
]
