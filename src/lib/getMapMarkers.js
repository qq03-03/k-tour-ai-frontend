// Reduces a list of segments to one marker per unique place_id, using the
// confirmed lat/lng from placeCoordinates.js. Segments whose place_id has no
// known coordinates are skipped rather than guessed.
export function getMapMarkers(segments, coordinates) {
  const seen = new Set()
  const markers = []
  for (const segment of segments) {
    const coord = coordinates[segment.place_id]
    if (!coord || seen.has(segment.place_id)) continue
    seen.add(segment.place_id)
    markers.push({
      place_id: segment.place_id,
      label: coord.place_name,
      latitude: coord.latitude,
      longitude: coord.longitude,
    })
  }
  return markers
}
