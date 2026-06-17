# Conventions du store Zustand

## Structure

```
store/
  types.ts      → enums globaux (TileLayer…), StoreState, StoreActions, Store
  actions/      → factory functions par domaine (map.ts, routes.ts, questions.ts…)
  actions.ts    → barrel : export * from "./actions/index"
  useStore.ts   → create<Store>((set) => ({ ...état initial, action: actionFn(set) }))
  index.ts      → exports publics
```

## Règles

- Les composants lisent le store directement avec `useStore((s) => s.xxx)` — pas de prop drilling pour l'état global.
- Toujours regrouper les sélecteurs en un seul appel destructuré avec `useShallow` (sinon boucle infinie — nouvel objet `{}` à chaque render) :

```ts
import { useShallow } from "zustand/react/shallow";

// ✅ bien
const { points, routes, isDrawing } = useStore(useShallow((s) => ({
  points: s.points,
  routes: s.routes,
  isDrawing: s.isDrawing,
})));

// ❌ pas bien — boucle infinie
const { points } = useStore((s) => ({ points: s.points }));
```

- Actions : factory functions `(set: Set) => (...args) => set(state => ({...}))`
- Regrouper les actions par tab/domaine dans `store/actions/`
