import { useShallow } from "zustand/react/shallow";
import { TileLayer, useStore } from "@/store";
import * as S from "./UI";

export const LayerControl = () => {
  const { tileLayer, setTileLayer } = useStore(
    useShallow((s) => ({
      tileLayer: s.tileLayer,
      setTileLayer: s.setTileLayer,
    }))
  );

  return (
    <S.Wrapper>
      <S.Option $active={tileLayer === TileLayer.OSM} onClick={() => setTileLayer(TileLayer.OSM)}>
        OSM
      </S.Option>
      <S.Option $active={tileLayer === TileLayer.ESRI} onClick={() => setTileLayer(TileLayer.ESRI)}>
        Satellite
      </S.Option>
    </S.Wrapper>
  );
};
