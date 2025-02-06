import styled from "styled-components";
import { colors } from "../styles/foundation";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  max-width: 100vw;
`;

export const BodyWrapper = styled.div<{ $isAuthPage: boolean }>`
  flex: 1;
  overflow: scroll;
  background: ${colors.neutral["100"]};
  display: ${({ $isAuthPage }) => ($isAuthPage ? "flex" : "block")};
`;
