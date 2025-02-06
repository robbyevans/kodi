import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const BodyWrapper = styled.div<{ isAuthenticated: boolean }>`
  flex: 1;
  overflow-y: auto;

  ${({ isAuthenticated }) =>
    isAuthenticated &&
    `
    margin-left: 250px;
    margin-top: 60px;
    margin-bottom: 60px;
    height: calc(100vh - 120px);

    @media (max-width: 768px) {
      margin-left: 0;
      height: calc(100vh - 120px);
    }
  `}
`;
