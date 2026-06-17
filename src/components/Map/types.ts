export type DrawLayerProps = {
  isDrawing: boolean;
  isPlacingQuestion: boolean;
  isPlacingCulture: boolean;
  isPlacingPlace: boolean;
  onAddPoint: (lat: number, lng: number) => void;
  onPlaceQuestion: (lat: number, lng: number) => void;
  onPlaceCulture: (lat: number, lng: number) => void;
  onPlacePlace: (lat: number, lng: number) => void;
};
