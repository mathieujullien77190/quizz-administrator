import styled from "styled-components";

export const Handle = styled.div`
  flex: 0 0 5px;
  cursor: col-resize;
  background-color: #e5e7eb;
  transition: background-color 0.15s;
  z-index: 10;

  &:hover {
    background-color: #3b82f6;
  }

  &:active {
    background-color: #3b82f6;
  }
`;
