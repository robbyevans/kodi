import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c34;
  color: white;
  font-family: Arial, sans-serif;
`;

export const FadeIn = styled.h1`
  opacity: 0;
  animation: ${fadeIn} 2s ease-in forwards;

  &.delay {
    animation-delay: 1s;
  }
`;
