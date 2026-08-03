// keywords map each tag onto real place_name/drama_title/description/mood/
// scene_elements/activity text in mockSegments.js. An empty array is honest:
// no matching data exists yet for that tag, so it correctly returns zero
// results (see lib/searchSegments.js matchesTheme) instead of fabricating
// matches or silently showing everything.
export const themes = [
  { id: 'night-view', label: 'Night View', icon: '🌃', keywords: ['night', 'skyscrapers', 'light trails', 'lighting'] },
  { id: 'drive', label: 'Drive', icon: '🚗', keywords: ['driving', 'bus', 'road'] },
  { id: 'cherry-blossom', label: 'Cherry Blossom', icon: '🌸', keywords: [] },
  { id: 'autumn-leaves', label: 'Autumn Leaves', icon: '🍁', keywords: ['autumn'] },
  { id: 'beach', label: 'Beach', icon: '🏖', keywords: ['beach', 'ocean', 'sea'] },
  { id: 'cafe', label: 'Cafe', icon: '☕', keywords: [] },
  { id: 'food', label: 'Food', icon: '🍜', keywords: [] },
  { id: 'drama', label: 'Drama', icon: '🎬', keywords: ['hanok', 'palace', 'traditional'] },
]
