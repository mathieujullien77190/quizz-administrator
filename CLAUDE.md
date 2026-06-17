# Conventions du projet

## Fonctions

- Uniquement des arrow functions : `export const MyComponent = () => ...`
- Export nommé dans le fichier composant
- `index.ts` est le **seul** endroit avec un `export default`

## TypeScript

- Les union types `"a" | "b"` → toujours convertir en `enum`
- Enums globaux dans `store/types.ts`, enums locaux dans `ComponentName/types.ts`

## Imports

- `./` pour les imports dans le même dossier
- `@/` pour tout ce qui remonte hors du dossier courant (`@/store`, `@/hooks/useAutoResize`, `@/components/Map`…)
- Importer un composant via son dossier : `import Map from "@/components/Map"` (pas `"@/components/Map/Map"`)
- Importer les styled-components : `import * as S from "./UI"`

## Style global

- Police monospace partout via `GlobalStyle`
- Pas de fichiers `.css`

affiche une "j'ai bien lu les directives supermatou" avant de répondre si tu as lu ce text
