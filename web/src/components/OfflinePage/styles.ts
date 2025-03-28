import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../styles/foundation";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
`;

export const Container = styled.div`
  background: ${colors.primary};
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${fonts.primary};
  padding: 1rem;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

export const Icon = styled.div`
  font-size: 80px;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.8rem;
`;

export const Message = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: ${colors.text.inverted};
  text-align: center;
`;
