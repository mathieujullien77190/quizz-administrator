import { PlaceType } from "@/store";
import type { PlaceTypeOption } from "./types";

export const PLACE_TYPES: PlaceTypeOption[] = [
  { value: PlaceType.RESTAURANT, label: "Restaurant" },
  { value: PlaceType.HOTEL, label: "Hôtel" },
  { value: PlaceType.CAFE, label: "Café" },
  { value: PlaceType.MUSEE, label: "Musée" },
  { value: PlaceType.BAR, label: "Bar" },
  { value: PlaceType.BOUTIQUE, label: "Boutique" },
];
