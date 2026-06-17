import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const MapPanel = styled.div<{ $width: number }>`
  flex: 0 0 ${({ $width }) => $width}%;
  overflow: hidden;
`;

export const SidePanelWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: #fff;
`;
