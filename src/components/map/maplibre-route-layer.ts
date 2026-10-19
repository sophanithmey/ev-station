import * as maplibregl from 'maplibre-gl';

const ROUTE_SOURCE_ID = 'route-source';
const ROUTE_LAYER_ID = 'route-layer';

export function syncMaplibreRouteLayer(
  map: maplibregl.Map,
  routeGeometry?: [number, number][],
): void {
  if (!routeGeometry || routeGeometry.length === 0) {
    if (map.getLayer(ROUTE_LAYER_ID)) map.removeLayer(ROUTE_LAYER_ID);
    if (map.getSource(ROUTE_SOURCE_ID)) map.removeSource(ROUTE_SOURCE_ID);
    return;
  }

  const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates: routeGeometry },
  };

  if (map.getSource(ROUTE_SOURCE_ID)) {
    (map.getSource(ROUTE_SOURCE_ID) as maplibregl.GeoJSONSource).setData(geojson);
  } else {
    map.addSource(ROUTE_SOURCE_ID, { type: 'geojson', data: geojson });
    map.addLayer({
      id: ROUTE_LAYER_ID,
      type: 'line',
      source: ROUTE_SOURCE_ID,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': '#10b981',
        'line-width': 5,
        'line-opacity': 0.85,
      },
    });
  }

  // Fit bounds to route
  const bounds = new maplibregl.LngLatBounds();
  routeGeometry.forEach((coord) => bounds.extend(coord));
  map.fitBounds(bounds, { padding: 50, duration: 800 });
}
