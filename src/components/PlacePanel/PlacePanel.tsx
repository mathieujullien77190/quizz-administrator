import { useState, useRef } from "react";
import { FaRegEye, FaRegEyeSlash, FaCode } from "react-icons/fa6";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store";
import JsonHighlight from "@/components/JsonHighlight";
import MarkdownEditor from "@/components/MarkdownEditor";
import { PLACE_TYPES } from "./constants";
import * as S from "./UI";

export const PlacePanel = () => {
  const {
    places, isPlacingPlace, startPlacingPlace, deletePlace,
    updatePlaceName, updatePlaceDescription, updatePlaceType,
    updatePlaceRating, togglePlaceVisibility,
  } = useStore(
    useShallow((s) => ({
      places: s.places,
      isPlacingPlace: s.isPlacingPlace,
      startPlacingPlace: s.startPlacingPlace,
      deletePlace: s.deletePlace,
      updatePlaceName: s.updatePlaceName,
      updatePlaceDescription: s.updatePlaceDescription,
      updatePlaceType: s.updatePlaceType,
      updatePlaceRating: s.updatePlaceRating,
      togglePlaceVisibility: s.togglePlaceVisibility,
    }))
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [jsonOpenId, setJsonOpenId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCommit = () => {
    if (editingId) {
      updatePlaceName(editingId, editingName.trim() || "Lieu sans nom");
      setEditingId(null);
    }
  };

  return (
    <S.Wrapper>
      <S.List>
        {places.map((p) => (
          <S.Item key={p.id}>
            <S.ItemRow>
              {editingId === p.id ? (
                <S.RenameInput
                  ref={inputRef}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleCommit}
                  onKeyDown={(e) => e.key === "Enter" && handleCommit()}
                />
              ) : (
                <S.PlaceName onClick={() => handleStartEdit(p.id, p.name)}>
                  {p.name}
                </S.PlaceName>
              )}
              <S.IconButton $muted={!p.visible} onClick={() => togglePlaceVisibility(p.id)}>
                {p.visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </S.IconButton>
              <S.IconButton $active={jsonOpenId === p.id} onClick={() => setJsonOpenId(jsonOpenId === p.id ? null : p.id)}>
                <FaCode />
              </S.IconButton>
              <S.IconButton onClick={() => deletePlace(p.id)}>✕</S.IconButton>
            </S.ItemRow>

            {p.visible && (
              <S.Form>
                <S.FieldLabel>Type</S.FieldLabel>
                <S.TypeGrid>
                  {PLACE_TYPES.map(({ value, label }) => (
                    <S.TypeChip
                      key={value}
                      $active={p.type === value}
                      onClick={() => updatePlaceType(p.id, value)}
                    >
                      {label}
                    </S.TypeChip>
                  ))}
                </S.TypeGrid>

                <S.FieldLabel>Note</S.FieldLabel>
                <S.Stars>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <S.Star
                      key={star}
                      $filled={star <= p.rating}
                      onClick={() => updatePlaceRating(p.id, star)}
                    >
                      ★
                    </S.Star>
                  ))}
                </S.Stars>

                <S.FieldLabel>Description</S.FieldLabel>
                <MarkdownEditor
                  value={p.description}
                  placeholder="Saisir du texte au format Markdown…"
                  onChange={(val) => updatePlaceDescription(p.id, val)}
                />
              </S.Form>
            )}
            {jsonOpenId === p.id && <JsonHighlight json={JSON.stringify(p, null, 2)} />}
          </S.Item>
        ))}
      </S.List>
      <S.AddButton $active={isPlacingPlace} onClick={startPlacingPlace}>
        {isPlacingPlace ? "Cliquez sur la carte…" : "Add lieu"}
      </S.AddButton>
    </S.Wrapper>
  );
};
