import { useCallback } from "react";
import * as S from "./UI";
import { MIN_PERCENT, MAX_PERCENT } from "./constants";
import type { ResizerProps } from "./types";

export const Resizer = ({ onResize }: ResizerProps) => {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const onMouseMove = (e: MouseEvent) => {
        const percent = (e.clientX / window.innerWidth) * 100;
        onResize(Math.min(Math.max(percent, MIN_PERCENT), MAX_PERCENT));
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [onResize]
  );

  return <S.Handle onMouseDown={handleMouseDown} />;
};
