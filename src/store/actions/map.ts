import type { StoreApi } from "zustand";
import type { Store, TileLayer } from "@/store/types";

type Set = StoreApi<Store>["setState"];

export const setTileLayer = (set: Set) => (layer: TileLayer) =>
  set({ tileLayer: layer });
