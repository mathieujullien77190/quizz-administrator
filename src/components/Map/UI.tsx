import styled from "styled-components";

export const MapWrapper = styled.div<{ $crosshair: boolean }>`
  position: relative;
  height: 100%;
  width: 100%;

  .leaflet-container {
    cursor: ${({ $crosshair }) => ($crosshair ? "crosshair" : "grab")};
  }
`;
