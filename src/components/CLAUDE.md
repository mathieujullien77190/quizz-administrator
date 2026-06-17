# Conventions des composants

## Structure d'un composant

Chaque composant vit dans son propre dossier :

```
ComponentName/
  ComponentName.tsx   → composant (arrow function, export nommé)
  UI.tsx              → tous les styled-components
  types.ts            → types TypeScript + enums  (.ts pas .tsx)
  constants.ts        → constantes spécifiques au composant
  helpers.ts          → fonctions utilitaires non liées au composant
  index.ts            → export { ComponentName as default } from "./ComponentName"
```

`types.ts`, `constants.ts` et `helpers.ts` sont optionnels — ne les créer que si le composant en a besoin.

## Styled-components

- Tous les styles dans `UI.tsx`, jamais de styles inline ni de fichiers `.css`
- Import systématique : `import * as S from "./UI"` → usage : `<S.Wrapper>`, `<S.Title>`…
- Convention visuelle : `<RouteList />` = composant React, `<S.Wrapper>` = styled-component
- Pas de fichiers CSS globaux — utiliser `createGlobalStyle` dans `src/GlobalStyle.tsx`
- `<GlobalStyle />` monté dans `App.tsx`
