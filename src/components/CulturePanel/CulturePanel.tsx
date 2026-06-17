import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaCode } from "react-icons/fa6";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store";
import JsonHighlight from "@/components/JsonHighlight";
import MarkdownEditor from "@/components/MarkdownEditor";
import * as S from "./UI";

export const CulturePanel = () => {
  const {
    cultures,
    isPlacingCulture,
    startPlacingCulture,
    deleteCulture,
    updateCultureName,
    updateCultureText,
    toggleCultureVisibility,
  } = useStore(
    useShallow((s) => ({
      cultures: s.cultures,
      isPlacingCulture: s.isPlacingCulture,
      startPlacingCulture: s.startPlacingCulture,
      deleteCulture: s.deleteCulture,
      updateCultureName: s.updateCultureName,
      updateCultureText: s.updateCultureText,
      toggleCultureVisibility: s.toggleCultureVisibility,
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
      updateCultureName(editingId, editingName.trim() || "Culture sans nom");
      setEditingId(null);
    }
  };

  return (
    <S.Wrapper>
      <S.List>
        {cultures.map((c) => (
          <S.Item key={c.id}>
            <S.ItemRow>
              {editingId === c.id ? (
                <S.RenameInput
                  ref={inputRef}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleCommit}
                  onKeyDown={(e) => e.key === "Enter" && handleCommit()}
                />
              ) : (
                <S.CultureName onClick={() => handleStartEdit(c.id, c.name)}>
                  {c.name}
                </S.CultureName>
              )}
              <S.IconButton $muted={!c.visible} onClick={() => toggleCultureVisibility(c.id)}>
                {c.visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </S.IconButton>
              <S.IconButton $active={jsonOpenId === c.id} onClick={() => setJsonOpenId(jsonOpenId === c.id ? null : c.id)}>
                <FaCode />
              </S.IconButton>
              <S.IconButton onClick={() => deleteCulture(c.id)}>✕</S.IconButton>
            </S.ItemRow>

            {c.visible && (
              <S.Form>
                <S.FieldLabel>Texte</S.FieldLabel>
                <MarkdownEditor
                  value={c.text}
                  placeholder="Saisir du texte au format Markdown…"
                  onChange={(val) => updateCultureText(c.id, val)}
                />
              </S.Form>
            )}
            {jsonOpenId === c.id && <JsonHighlight json={JSON.stringify(c, null, 2)} />}
          </S.Item>
        ))}
      </S.List>
      <S.AddButton $active={isPlacingCulture} onClick={startPlacingCulture}>
        {isPlacingCulture ? "Cliquez sur la carte…" : "Add culture"}
      </S.AddButton>
    </S.Wrapper>
  );
};
