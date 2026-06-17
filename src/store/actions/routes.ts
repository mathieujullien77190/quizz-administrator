import * as turf from "@turf/turf";
import type { StoreApi } from "zustand";
import type { Store } from "@/store/types";

type Set = StoreApi<Store>["setState"];

export const startDrawing = (set: Set) => () =>
  set({ isDrawing: true, points: [] });

export const stopDrawing = (set: Set) => () =>
  set((state) => {
    if (state.points.length < 2) return { isDrawing: false, points: [] };
    const counter = state.routeCounter + 1;
    return {
      isDrawing: false,
      points: [],
      routeCounter: counter,
      routes: [
        ...state.routes,
        { id: crypto.randomUUID(), name: `Route ${counter}`, points: state.points, visible: false },
      ],
    };
  });

export const addPoint = (set: Set) => (lat: number, lng: number) =>
  set((state) => ({ points: [...state.points, [lat, lng]] }));

export const deleteRoute = (set: Set) => (id: string) =>
  set((state) => ({ routes: state.routes.filter((r) => r.id !== id) }));

export const toggleRouteVisibility = (set: Set) => (id: string) =>
  set((state) => ({
    fitBoundsRevision: state.fitBoundsRevision + 1,
    routes: state.routes.map((r) => (r.id === id ? { ...r, visible: !r.visible } : r)),
  }));

export const renameRoute = (set: Set) => (id: string, name: string) =>
  set((state) => ({
    routes: state.routes.map((r) => (r.id === id ? { ...r, name } : r)),
  }));

export const optimizeRoute = (set: Set) => (id: string) =>
  set((state) => {
    const route = state.routes.find((r) => r.id === id);
    if (!route || route.points.length < 2) return {};

    const coords = route.points.map(([lat, lng]) => [lng, lat] as [number, number]);
    const line = turf.lineString(coords);
    const totalKm = turf.length(line, { units: "kilometers" });
    const stepKm = 0.1;

    const optimized: [number, number][] = [];
    for (let d = 0; d < totalKm; d += stepKm) {
      const pt = turf.along(line, d, { units: "kilometers" });
      const [lng, lat] = pt.geometry.coordinates as [number, number];
      optimized.push([lat, lng]);
    }
    const [lastLng, lastLat] = coords[coords.length - 1];
    optimized.push([lastLat, lastLng]);

    return {
      routes: state.routes.map((r) => (r.id === id ? { ...r, points: optimized } : r)),
    };
  });
