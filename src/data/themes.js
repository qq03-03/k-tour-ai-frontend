// keywords map each tag onto real mood/scene_elements/activity values in mockSegments.js.
// An empty array is honest: no matching data exists yet, so that tag shows the
// empty-results state instead of fabricated matches (see spec §5).
export const themes = [
  { id: 'night-view', label: 'Night View', icon: '🌃', keywords: [] },
  { id: 'drive', label: 'Drive', icon: '🚗', keywords: [] },
  { id: 'cherry-blossom', label: 'Cherry Blossom', icon: '🌸', keywords: [] },
  { id: 'autumn-leaves', label: 'Autumn Leaves', icon: '🍁', keywords: [] },
  { id: 'beach', label: 'Beach', icon: '🏖', keywords: ['pond', 'water', 'swimming'] },
  { id: 'cafe', label: 'Cafe', icon: '☕', keywords: [] },
  { id: 'food', label: 'Food', icon: '🍜', keywords: [] },
  { id: 'drama', label: 'Drama', icon: '🎬', keywords: [] },
]
