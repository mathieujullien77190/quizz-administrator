import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background-color: #fff;
  color: ${({ $active }) => ($active ? "#3b82f6" : "#6b7280")};
  border-bottom: 2px solid ${({ $active }) => ($active ? "#3b82f6" : "transparent")};
  transition: color 0.15s, border-color 0.15s;
  margin-bottom: -1px;

  &:hover {
    color: #3b82f6;
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;
