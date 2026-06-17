import { useEffect } from "react";
import type { Map as LeafletMap } from "leaflet";

export const useAutoResize = (map: LeafletMap | null) => {
  useEffect(() => {
    if (!map) return;
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
};
