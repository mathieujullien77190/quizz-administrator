import type { StoreApi } from "zustand";
import type { Store } from "@/store/types";
import { PlaceType } from "@/store/types";

type Set = StoreApi<Store>["setState"];

export const startPlacingPlace = (set: Set) => () =>
  set((state) => ({ isPlacingPlace: !state.isPlacingPlace }));

export const placePlace = (set: Set) => (lat: number, lng: number) =>
  set((state) => {
    const counter = state.placeCounter + 1;
    return {
      isPlacingPlace: false,
      placeCounter: counter,
      places: [
        ...state.places,
        {
          id: crypto.randomUUID(),
          name: `Lieu ${counter}`,
          description: "",
          type: PlaceType.RESTAURANT,
          rating: 0,
          point: [lat, lng] as [number, number],
          visible: true,
        },
      ],
    };
  });

export const deletePlace = (set: Set) => (id: string) =>
  set((state) => ({ places: state.places.filter((p) => p.id !== id) }));

export const updatePlaceName = (set: Set) => (id: string, name: string) =>
  set((state) => ({
    places: state.places.map((p) => (p.id === id ? { ...p, name } : p)),
  }));

export const updatePlaceDescription = (set: Set) => (id: string, description: string) =>
  set((state) => ({
    places: state.places.map((p) => (p.id === id ? { ...p, description } : p)),
  }));

export const updatePlaceType = (set: Set) => (id: string, type: PlaceType) =>
  set((state) => ({
    places: state.places.map((p) => (p.id === id ? { ...p, type } : p)),
  }));

export const updatePlaceRating = (set: Set) => (id: string, rating: number) =>
  set((state) => ({
    places: state.places.map((p) =>
      p.id === id ? { ...p, rating: p.rating === rating ? 0 : rating } : p
    ),
  }));

export const togglePlaceVisibility = (set: Set) => (id: string) =>
  set((state) => ({
    fitBoundsRevision: state.fitBoundsRevision + 1,
    places: state.places.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)),
  }));
