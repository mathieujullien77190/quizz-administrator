import { useState, useRef } from "react";
import { FaCode, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useShallow } from "zustand/react/shallow";
import { useStore, QuestionType } from "@/store";
import JsonHighlight from "@/components/JsonHighlight";
import { ANSWER_LABELS } from "./constants";
import { toJson } from "./helpers";
import * as S from "./UI";

export const QuestionPanel = () => {
  const {
    questions,
    isPlacingQuestion,
    startPlacingQuestion,
    deleteQuestion,
    updateQuestionName,
    updateQuestionText,
    updateAnswer,
    setCorrectAnswers,
    setQuestionType,
    toggleQuestionVisibility,
  } = useStore(
    useShallow((s) => ({
      questions: s.questions,
      isPlacingQuestion: s.isPlacingQuestion,
      startPlacingQuestion: s.startPlacingQuestion,
      deleteQuestion: s.deleteQuestion,
      updateQuestionName: s.updateQuestionName,
      updateQuestionText: s.updateQuestionText,
      updateAnswer: s.updateAnswer,
      setCorrectAnswers: s.setCorrectAnswers,
      setQuestionType: s.setQuestionType,
      toggleQuestionVisibility: s.toggleQuestionVisibility,
    }))
  );

  const [jsonOpenId, setJsonOpenId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCommit = () => {
    if (editingId) {
      updateQuestionName(editingId, editingName.trim() || "Question sans nom");
      setEditingId(null);
    }
  };

  const handleToggleCorrect = (q: { id: string; type: QuestionType; correctAnswerIds: string[] }, answerId: string) => {
    if (q.type === QuestionType.SINGLE) {
      setCorrectAnswers(q.id, [answerId]);
    } else {
      const next = q.correctAnswerIds.includes(answerId)
        ? q.correctAnswerIds.filter((id) => id !== answerId)
        : [...q.correctAnswerIds, answerId];
      setCorrectAnswers(q.id, next);
    }
  };

  return (
    <S.Wrapper>
      <S.List>
        {questions.map((q) => (
          <S.Item key={q.id}>
            <S.ItemRow>
              {editingId === q.id ? (
                <S.RenameInput
                  ref={inputRef}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleCommit}
                  onKeyDown={(e) => e.key === "Enter" && handleCommit()}
                />
              ) : (
                <S.QuestionName onClick={() => handleStartEdit(q.id, q.name)}>
                  {q.name}
                </S.QuestionName>
              )}
              <S.IconButton onClick={() => setJsonOpenId((prev) => (prev === q.id ? null : q.id))}>
                <S.CodeIconWrapper $active={jsonOpenId === q.id}>
                  <FaCode />
                </S.CodeIconWrapper>
              </S.IconButton>
              <S.IconButton $muted={!q.visible} onClick={() => toggleQuestionVisibility(q.id)}>
                {q.visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </S.IconButton>
              <S.IconButton onClick={() => deleteQuestion(q.id)}>✕</S.IconButton>
            </S.ItemRow>

            {jsonOpenId === q.id && <JsonHighlight json={toJson(q)} />}

            {q.visible && (
              <S.Form>
                <S.TypeToggle>
                  <S.TypeOption
                    $active={q.type === QuestionType.SINGLE}
                    onClick={() => setQuestionType(q.id, QuestionType.SINGLE)}
                  >
                    ◉ Une réponse
                  </S.TypeOption>
                  <S.TypeOption
                    $active={q.type === QuestionType.MULTIPLE}
                    onClick={() => setQuestionType(q.id, QuestionType.MULTIPLE)}
                  >
                    ☑ Plusieurs réponses
                  </S.TypeOption>
                  <S.TypeOption
                    $active={q.type === QuestionType.TEXT}
                    onClick={() => setQuestionType(q.id, QuestionType.TEXT)}
                  >
                    ✎ Texte libre
                  </S.TypeOption>
                </S.TypeToggle>

                <S.FieldLabel>Question</S.FieldLabel>
                <S.FieldInput
                  value={q.text}
                  placeholder="Saisir la question…"
                  onChange={(e) => updateQuestionText(q.id, e.target.value)}
                />

                {q.type === QuestionType.TEXT ? (
                  <>
                    <S.FieldLabel>Réponse attendue</S.FieldLabel>
                    <S.FieldInput
                      value={q.answers[0]?.text ?? ""}
                      placeholder="Saisir le mot attendu…"
                      onChange={(e) => updateAnswer(q.id, q.answers[0].id, e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <S.FieldLabel>Réponses</S.FieldLabel>
                    <S.AnswerGrid>
                      {q.answers.map((answer, i) => (
                        <S.AnswerRow key={answer.id}>
                          <S.CorrectButton
                            $correct={q.correctAnswerIds.includes(answer.id)}
                            $multiple={q.type === QuestionType.MULTIPLE}
                            onClick={() => handleToggleCorrect(q, answer.id)}
                            title="Marquer comme bonne réponse"
                          />
                          <S.AnswerLabel>{ANSWER_LABELS[i]}</S.AnswerLabel>
                          <S.FieldInput
                            value={answer.text}
                            placeholder={`Réponse ${ANSWER_LABELS[i]}…`}
                            onChange={(e) => updateAnswer(q.id, answer.id, e.target.value)}
                          />
                        </S.AnswerRow>
                      ))}
                    </S.AnswerGrid>
                  </>
                )}
              </S.Form>
            )}
          </S.Item>
        ))}
      </S.List>
      <S.AddButton $active={isPlacingQuestion} onClick={startPlacingQuestion}>
        {isPlacingQuestion ? "Cliquez sur la carte…" : "Add question"}
      </S.AddButton>
    </S.Wrapper>
  );
};
