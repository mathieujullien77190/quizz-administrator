import ReactMarkdown from "react-markdown";
import type { MarkdownEditorProps } from "./types";
import * as S from "./UI";

export const MarkdownEditor = ({ value, placeholder, onChange }: MarkdownEditorProps) => (
  <S.Wrapper>
    <S.Editor
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
    <S.Preview>
      <ReactMarkdown>{value}</ReactMarkdown>
    </S.Preview>
  </S.Wrapper>
);
