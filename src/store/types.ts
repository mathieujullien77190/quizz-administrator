export enum TileLayer {
  OSM = "osm",
  ESRI = "esri",
}

export enum QuestionType {
  SINGLE = "single",
  MULTIPLE = "multiple",
  TEXT = "text",
}

export enum PlaceType {
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  CAFE = "cafe",
  MUSEE = "musee",
  BAR = "bar",
  BOUTIQUE = "boutique",
}

export type Route = {
  id: string;
  name: string;
  points: [number, number][];
  visible: boolean;
};

export type Answer = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  name: string;
  text: string;
  type: QuestionType;
  point: [number, number];
  answers: Answer[];
  correctAnswerIds: string[];
  visible: boolean;
};

export type Culture = {
  id: string;
  name: string;
  text: string;
  point: [number, number];
  visible: boolean;
};

export type Place = {
  id: string;
  name: string;
  description: string;
  type: PlaceType;
  rating: number;
  point: [number, number];
  visible: boolean;
};

export type StoreState = {
  isDrawing: boolean;
  points: [number, number][];
  tileLayer: TileLayer;
  routes: Route[];
  routeCounter: number;
  isPlacingQuestion: boolean;
  questions: Question[];
  questionCounter: number;
  isPlacingCulture: boolean;
  cultures: Culture[];
  cultureCounter: number;
  isPlacingPlace: boolean;
  places: Place[];
  placeCounter: number;
  fitBoundsRevision: number;
};

export type StoreActions = {
  startDrawing: () => void;
  stopDrawing: () => void;
  addPoint: (lat: number, lng: number) => void;
  setTileLayer: (layer: TileLayer) => void;
  deleteRoute: (id: string) => void;
  toggleRouteVisibility: (id: string) => void;
  renameRoute: (id: string, name: string) => void;
  optimizeRoute: (id: string) => void;
  startPlacingQuestion: () => void;
  placeQuestion: (lat: number, lng: number) => void;
  deleteQuestion: (id: string) => void;
  updateQuestionName: (id: string, name: string) => void;
  updateQuestionText: (id: string, text: string) => void;
  updateAnswer: (questionId: string, answerId: string, text: string) => void;
  setCorrectAnswers: (questionId: string, answerIds: string[]) => void;
  setQuestionType: (questionId: string, type: QuestionType) => void;
  toggleQuestionVisibility: (id: string) => void;
  startPlacingCulture: () => void;
  placeCulture: (lat: number, lng: number) => void;
  deleteCulture: (id: string) => void;
  updateCultureName: (id: string, name: string) => void;
  updateCultureText: (id: string, text: string) => void;
  toggleCultureVisibility: (id: string) => void;
  startPlacingPlace: () => void;
  placePlace: (lat: number, lng: number) => void;
  deletePlace: (id: string) => void;
  updatePlaceName: (id: string, name: string) => void;
  updatePlaceDescription: (id: string, description: string) => void;
  updatePlaceType: (id: string, type: PlaceType) => void;
  updatePlaceRating: (id: string, rating: number) => void;
  togglePlaceVisibility: (id: string) => void;
};

export type Store = StoreState & StoreActions;
