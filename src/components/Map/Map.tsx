import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useShallow } from "zustand/react/shallow";
import * as S from "./UI";
import { DrawLayer } from "./DrawLayer";
import { TILES, MARKER_COLORS } from "./constants";
import { useAutoResize } from "@/hooks/useAutoResize";
import { useStore } from "@/store";
import LayerControl from "@/components/LayerControl";

export const Map = () => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const {
    isDrawing, isPlacingQuestion, isPlacingCulture, isPlacingPlace,
    points, routes, questions, cultures, places,
    tileLayer, addPoint, placeQuestion, placeCulture, placePlace,
    fitBoundsRevision,
  } = useStore(
    useShallow((s) => ({
      isDrawing: s.isDrawing,
      isPlacingQuestion: s.isPlacingQuestion,
      isPlacingCulture: s.isPlacingCulture,
      isPlacingPlace: s.isPlacingPlace,
      points: s.points,
      routes: s.routes,
      questions: s.questions,
      cultures: s.cultures,
      places: s.places,
      tileLayer: s.tileLayer,
      addPoint: s.addPoint,
      placeQuestion: s.placeQuestion,
      placeCulture: s.placeCulture,
      placePlace: s.placePlace,
      fitBoundsRevision: s.fitBoundsRevision,
    }))
  );
  const tile = TILES[tileLayer];

  useAutoResize(map);

  useEffect(() => {
    if (!map || fitBoundsRevision === 0) return;
    const allPoints: [number, number][] = [
      ...routes.filter((r) => r.visible).flatMap((r) => r.points),
      ...questions.filter((q) => q.visible).map((q) => q.point),
      ...cultures.filter((c) => c.visible).map((c) => c.point),
      ...places.filter((p) => p.visible).map((p) => p.point),
    ];
    if (allPoints.length === 0) return;
    map.fitBounds(allPoints, { padding: [40, 40] });
  }, [fitBoundsRevision]);

  return (
    <S.MapWrapper $crosshair={isDrawing || isPlacingQuestion || isPlacingCulture || isPlacingPlace}>
      <MapContainer ref={setMap} center={[48.8566, 2.3522]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url={tile.url} attribution={tile.attribution} />
        <DrawLayer
          isDrawing={isDrawing}
          isPlacingQuestion={isPlacingQuestion}
          isPlacingCulture={isPlacingCulture}
          isPlacingPlace={isPlacingPlace}
          onAddPoint={addPoint}
          onPlaceQuestion={placeQuestion}
          onPlaceCulture={placeCulture}
          onPlacePlace={placePlace}
        />

        {routes.filter((r) => r.visible).map((route) => (
          <>
            <Polyline key={`line-${route.id}`} positions={route.points} color={MARKER_COLORS.route} />
            {route.points.map((point, i) => (
              <CircleMarker key={`${route.id}-${i}`} center={point} radius={4} color={MARKER_COLORS.route} fillColor="#fff" fillOpacity={1} weight={2} />
            ))}
          </>
        ))}

        {points.length >= 2 && <Polyline positions={points} color={MARKER_COLORS.routeDraft} dashArray="6" />}
        {points.map((point, i) => (
          <CircleMarker key={`draft-${i}`} center={point} radius={4} color={MARKER_COLORS.routeDraft} fillColor="#fff" fillOpacity={1} weight={2} />
        ))}

        {questions.filter((q) => q.visible).map((q) => (
          <CircleMarker key={q.id} center={q.point} radius={7} color={MARKER_COLORS.question} fillColor={MARKER_COLORS.question} fillOpacity={0.9} weight={2} />
        ))}

        {cultures.filter((c) => c.visible).map((c) => (
          <CircleMarker key={c.id} center={c.point} radius={7} color={MARKER_COLORS.culture} fillColor={MARKER_COLORS.culture} fillOpacity={0.9} weight={2} />
        ))}

        {places.filter((p) => p.visible).map((p) => (
          <CircleMarker key={p.id} center={p.point} radius={7} color={MARKER_COLORS.place} fillColor={MARKER_COLORS.place} fillOpacity={0.9} weight={2} />
        ))}
      </MapContainer>
      <LayerControl />
    </S.MapWrapper>
  );
};
