import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  gap: 12px;
`;

export const List = styled.ul`
  flex: 1;
  overflow-y: auto;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Item = styled.li`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  overflow: hidden;
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
`;

export const QuestionName = styled.span`
  flex: 1;
  font-size: 13px;
  color: #1e293b;
  cursor: text;
`;

export const RenameInput = styled.input`
  flex: 1;
  font-size: 13px;
  font-family: monospace;
  color: #1e293b;
  border: none;
  border-bottom: 1px solid #8b5cf6;
  background: transparent;
  outline: none;
  padding: 0;
`;

export const IconButton = styled.button<{ $muted?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  padding: 3px 5px;
  border-radius: 4px;
  opacity: ${({ $muted }) => ($muted ? 0.3 : 1)};
  transition: opacity 0.15s, background-color 0.15s;

  &:hover {
    opacity: 1;
    background-color: #e5e7eb;
  }
`;

export const CodeIconWrapper = styled.span<{ $active: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
  transition: opacity 0.15s;
`;


export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #e5e7eb;
  background-color: #f1f5f9;
`;

export const TypeToggle = styled.div`
  display: flex;
  gap: 6px;
`;

export const TypeOption = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 5px 8px;
  font-size: 11px;
  font-family: monospace;
  border-radius: 4px;
  border: 1px solid ${({ $active }) => ($active ? "#8b5cf6" : "#d1d5db")};
  background-color: ${({ $active }) => ($active ? "#ede9fe" : "#fff")};
  color: ${({ $active }) => ($active ? "#6d28d9" : "#6b7280")};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #8b5cf6;
    color: #6d28d9;
  }
`;

export const FieldLabel = styled.label`
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 12px;
  font-family: monospace;
  color: #1e293b;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 5px 8px;
  background: #fff;
  outline: none;

  &:focus {
    border-color: #8b5cf6;
  }
`;

export const AnswerGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AnswerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const AnswerLabel = styled.span`
  font-size: 11px;
  color: #8b5cf6;
  font-weight: 600;
  width: 14px;
  flex-shrink: 0;
`;

export const CorrectButton = styled.button<{ $correct: boolean; $multiple: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: ${({ $multiple }) => ($multiple ? "3px" : "50%")};
  border: 2px solid ${({ $correct }) => ($correct ? "#22c55e" : "#d1d5db")};
  background-color: ${({ $correct }) => ($correct ? "#22c55e" : "transparent")};
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: background-color 0.15s, border-color 0.15s;

  &:hover {
    border-color: #22c55e;
  }
`;

export const AddButton = styled.button<{ $active: boolean }>`
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background-color: ${({ $active }) => ($active ? "#ef4444" : "#8b5cf6")};
  color: #fff;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`;
