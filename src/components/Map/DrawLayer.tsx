import { useMapEvents } from "react-leaflet";
import type { DrawLayerProps } from "./types";

export const DrawLayer = ({
  isDrawing, isPlacingQuestion, isPlacingCulture, isPlacingPlace,
  onAddPoint, onPlaceQuestion, onPlaceCulture, onPlacePlace,
}: DrawLayerProps) => {
  useMapEvents({
    click(e) {
      if (isDrawing) onAddPoint(e.latlng.lat, e.latlng.lng);
      else if (isPlacingQuestion) onPlaceQuestion(e.latlng.lat, e.latlng.lng);
      else if (isPlacingCulture) onPlaceCulture(e.latlng.lat, e.latlng.lng);
      else if (isPlacingPlace) onPlacePlace(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};
