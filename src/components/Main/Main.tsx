import { useState } from "react";
import Map from "@/components/Map";
import SidePanel from "@/components/SidePanel";
import Resizer from "@/components/Resizer";
import Header from "@/components/Header";
import * as S from "./UI";
import { DEFAULT_SPLIT } from "@/components/Resizer/constants";

export const Main = () => {
  const [splitPercent, setSplitPercent] = useState(DEFAULT_SPLIT);

  return (
    <S.Layout>
      <Header />
      <S.Content>
        <S.MapPanel $width={splitPercent}>
          <Map />
        </S.MapPanel>
        <Resizer onResize={setSplitPercent} />
        <S.SidePanelWrapper>
          <SidePanel />
        </S.SidePanelWrapper>
      </S.Content>
    </S.Layout>
  );
};
