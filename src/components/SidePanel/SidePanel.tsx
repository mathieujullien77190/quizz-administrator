import { useState } from "react";
import RouteList from "@/components/RouteList";
import QuestionPanel from "@/components/QuestionPanel";
import CulturePanel from "@/components/CulturePanel";
import PlacePanel from "@/components/PlacePanel";
import * as S from "./UI";
import { Tab } from "./types";

export const SidePanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ROUTES);

  return (
    <S.Container>
      <S.TabBar>
        <S.TabButton $active={activeTab === Tab.ROUTES} onClick={() => setActiveTab(Tab.ROUTES)}>
          Routes
        </S.TabButton>
        <S.TabButton $active={activeTab === Tab.QUESTIONS} onClick={() => setActiveTab(Tab.QUESTIONS)}>
          Questions
        </S.TabButton>
        <S.TabButton $active={activeTab === Tab.CULTURES} onClick={() => setActiveTab(Tab.CULTURES)}>
          Cultures
        </S.TabButton>
        <S.TabButton $active={activeTab === Tab.LIEUX} onClick={() => setActiveTab(Tab.LIEUX)}>
          Lieux
        </S.TabButton>
      </S.TabBar>
      <S.Content>
        {activeTab === Tab.ROUTES && <RouteList />}
        {activeTab === Tab.QUESTIONS && <QuestionPanel />}
        {activeTab === Tab.CULTURES && <CulturePanel />}
        {activeTab === Tab.LIEUX && <PlacePanel />}
      </S.Content>
    </S.Container>
  );
};
