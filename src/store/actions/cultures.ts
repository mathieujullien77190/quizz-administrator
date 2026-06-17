import type { StoreApi } from "zustand";
import type { Store } from "@/store/types";

type Set = StoreApi<Store>["setState"];

export const startPlacingCulture = (set: Set) => () =>
  set((state) => ({ isPlacingCulture: !state.isPlacingCulture }));

export const placeCulture = (set: Set) => (lat: number, lng: number) =>
  set((state) => {
    const counter = state.cultureCounter + 1;
    return {
      isPlacingCulture: false,
      cultureCounter: counter,
      cultures: [
        ...state.cultures,
        {
          id: crypto.randomUUID(),
          name: `Culture ${counter}`,
          text: "",
          point: [lat, lng] as [number, number],
          visible: true,
        },
      ],
    };
  });

export const deleteCulture = (set: Set) => (id: string) =>
  set((state) => ({ cultures: state.cultures.filter((c) => c.id !== id) }));

export const updateCultureName = (set: Set) => (id: string, name: string) =>
  set((state) => ({
    cultures: state.cultures.map((c) => (c.id === id ? { ...c, name } : c)),
  }));

export const updateCultureText = (set: Set) => (id: string, text: string) =>
  set((state) => ({
    cultures: state.cultures.map((c) => (c.id === id ? { ...c, text } : c)),
  }));

export const toggleCultureVisibility = (set: Set) => (id: string) =>
  set((state) => ({
    fitBoundsRevision: state.fitBoundsRevision + 1,
    cultures: state.cultures.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)),
  }));
