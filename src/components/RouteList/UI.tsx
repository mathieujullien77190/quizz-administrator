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

export const RouteName = styled.span`
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
  border-bottom: 1px solid #3b82f6;
  background: transparent;
  outline: none;
  padding: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 4px;
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
  display: inline-flex;
  align-items: center;
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
`;


export const AddButton = styled.button<{ $active: boolean }>`
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background-color: ${({ $active }) => ($active ? "#ef4444" : "#3b82f6")};
  color: #fff;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`;
