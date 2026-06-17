export const toGeoJson = (points: [number, number][]) =>
  JSON.stringify(
    {
      type: "Feature",
      geometry: { type: "LineString", coordinates: points.map(([lat, lng]) => [lng, lat]) },
      properties: {},
    },
    null,
    2
  );
