import type { StoreApi } from "zustand";
import type { Store } from "@/store/types";
import { QuestionType } from "@/store/types";

type Set = StoreApi<Store>["setState"];

export const startPlacingQuestion = (set: Set) => () =>
  set((state) => ({ isPlacingQuestion: !state.isPlacingQuestion }));

export const placeQuestion = (set: Set) => (lat: number, lng: number) =>
  set((state) => {
    const counter = state.questionCounter + 1;
    return {
      isPlacingQuestion: false,
      questionCounter: counter,
      questions: [
        ...state.questions,
        {
          id: crypto.randomUUID(),
          name: `Question ${counter}`,
          text: "",
          type: QuestionType.SINGLE,
          point: [lat, lng] as [number, number],
          answers: Array.from({ length: 4 }, () => ({ id: crypto.randomUUID(), text: "" })),
          correctAnswerIds: [],
          visible: true,
        },
      ],
    };
  });

export const deleteQuestion = (set: Set) => (id: string) =>
  set((state) => ({ questions: state.questions.filter((q) => q.id !== id) }));

export const updateQuestionName = (set: Set) => (id: string, name: string) =>
  set((state) => ({
    questions: state.questions.map((q) => (q.id === id ? { ...q, name } : q)),
  }));

export const updateQuestionText = (set: Set) => (id: string, text: string) =>
  set((state) => ({
    questions: state.questions.map((q) => (q.id === id ? { ...q, text } : q)),
  }));

export const updateAnswer = (set: Set) => (questionId: string, answerId: string, text: string) =>
  set((state) => ({
    questions: state.questions.map((q) =>
      q.id === questionId
        ? { ...q, answers: q.answers.map((a) => (a.id === answerId ? { ...a, text } : a)) }
        : q
    ),
  }));

export const setCorrectAnswers = (set: Set) => (questionId: string, answerIds: string[]) =>
  set((state) => ({
    questions: state.questions.map((q) =>
      q.id === questionId ? { ...q, correctAnswerIds: answerIds } : q
    ),
  }));

export const setQuestionType = (set: Set) => (questionId: string, type: QuestionType) =>
  set((state) => ({
    questions: state.questions.map((q) =>
      q.id === questionId ? { ...q, type, correctAnswerIds: [] } : q
    ),
  }));

export const toggleQuestionVisibility = (set: Set) => (id: string) =>
  set((state) => ({
    fitBoundsRevision: state.fitBoundsRevision + 1,
    questions: state.questions.map((q) => (q.id === id ? { ...q, visible: !q.visible } : q)),
  }));
