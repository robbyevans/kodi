// File: /web/src/styles/foundation.ts
import styled from "styled-components";

export const StyledModalOverlay = styled.div<{ $isBlury?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: ${({ $isBlury }) => ($isBlury ? "blur(4px)" : "none")};
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  opacity: 1;
  transition: opacity 0.3s ease;
`;
