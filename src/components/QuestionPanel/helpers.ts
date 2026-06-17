import type { Question } from "@/store";
import { QuestionType } from "@/store";
import { ANSWER_LABELS } from "./constants";

export const toJson = (q: Question) => {
  if (q.type === QuestionType.TEXT) {
    return JSON.stringify(
      {
        name: q.name,
        type: q.type,
        text: q.text,
        point: q.point,
        expectedAnswer: q.answers[0]?.text ?? "",
      },
      null,
      2
    );
  }

  return JSON.stringify(
    {
      name: q.name,
      type: q.type,
      text: q.text,
      point: q.point,
      answers: q.answers.map((a, i) => ({
        label: ANSWER_LABELS[i],
        text: a.text,
        correct: q.correctAnswerIds.includes(a.id),
      })),
    },
    null,
    2
  );
};
