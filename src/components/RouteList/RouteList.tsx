import { useState, useRef } from "react";
import { FaRegEye, FaRegEyeSlash, FaCode, FaRoute } from "react-icons/fa6";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store";
import JsonHighlight from "@/components/JsonHighlight";
import { toGeoJson } from "./helpers";
import * as S from "./UI";

export const RouteList = () => {
  const { routes, isDrawing, startDrawing, stopDrawing, deleteRoute, toggleRouteVisibility, renameRoute, optimizeRoute } = useStore(
    useShallow((s) => ({
      routes: s.routes,
      isDrawing: s.isDrawing,
      startDrawing: s.startDrawing,
      stopDrawing: s.stopDrawing,
      deleteRoute: s.deleteRoute,
      toggleRouteVisibility: s.toggleRouteVisibility,
      renameRoute: s.renameRoute,
      optimizeRoute: s.optimizeRoute,
    }))
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCommit = () => {
    if (editingId) {
      renameRoute(editingId, editingName.trim() || "Route sans nom");
      setEditingId(null);
    }
  };

  const toggleExpanded = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <S.Wrapper>
      <S.List>
        {routes.map((route) => (
          <S.Item key={route.id}>
            <S.ItemRow>
              {editingId === route.id ? (
                <S.RenameInput
                  ref={inputRef}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleCommit}
                  onKeyDown={(e) => e.key === "Enter" && handleCommit()}
                />
              ) : (
                <S.RouteName onClick={() => handleStartEdit(route.id, route.name)}>
                  {route.name}
                </S.RouteName>
              )}
              <S.Actions>
                <S.IconButton title="Interpoler un point tous les 100m" onClick={() => optimizeRoute(route.id)}>
                  <FaRoute />
                </S.IconButton>
                <S.IconButton onClick={() => toggleExpanded(route.id)}>
                  <S.CodeIconWrapper $active={expandedId === route.id}>
                    <FaCode />
                  </S.CodeIconWrapper>
                </S.IconButton>
                <S.IconButton $muted={!route.visible} onClick={() => toggleRouteVisibility(route.id)}>
                  {route.visible ? <FaRegEye /> : <FaRegEyeSlash />}
                </S.IconButton>
                <S.IconButton onClick={() => deleteRoute(route.id)}>✕</S.IconButton>
              </S.Actions>
            </S.ItemRow>
            {expandedId === route.id && <JsonHighlight json={toGeoJson(route.points)} />}
          </S.Item>
        ))}
      </S.List>
      <S.AddButton $active={isDrawing} onClick={isDrawing ? stopDrawing : startDrawing}>
        {isDrawing ? "Stop drawing" : "Add route"}
      </S.AddButton>
    </S.Wrapper>
  );
};
