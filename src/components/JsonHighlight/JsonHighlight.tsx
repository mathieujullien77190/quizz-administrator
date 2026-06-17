import type { ReactNode } from "react";
import type { JsonHighlightProps } from "./types";
import { tokenize } from "./helpers";
import * as S from "./UI";

export const JsonHighlight = ({ json }: JsonHighlightProps): ReactNode => (
  <S.Container>
    {tokenize(json).map((t, i) => (
      <span key={i} style={{ color: t.color }}>
        {t.text}
      </span>
    ))}
  </S.Container>
);
