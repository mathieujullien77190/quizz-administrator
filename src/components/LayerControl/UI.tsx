import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1000;
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
`;

export const Option = styled.button<{ $active: boolean }>`
  padding: 7px 12px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ $active }) => ($active ? "#1e293b" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#374151")};
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#1e293b" : "#f1f5f9")};
  }
`;
