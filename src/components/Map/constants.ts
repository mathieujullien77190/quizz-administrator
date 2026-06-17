import { TileLayer } from "@/store";

export const TILES: Record<TileLayer, { url: string; attribution: string }> = {
  [TileLayer.OSM]: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  },
  [TileLayer.ESRI]: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
};

export const MARKER_COLORS = {
  route: "#3b82f6",
  routeDraft: "#f97316",
  question: "#8b5cf6",
  culture: "#f59e0b",
  place: "#10b981",
} as const;
