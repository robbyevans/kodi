import styled from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
} from "../../styles/foundation";

export const Container = styled.div`
  max-width: 400px;
  margin: ${spacing["2xl"]} auto;
  padding: ${spacing.xl};
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.sm};

  h1 {
    text-align: center;
    margin-bottom: ${spacing.lg};
    color: ${colors.text.primary};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${spacing.sm};
  }

  input {
    width: 100%;
    padding: ${spacing.sm};
    font-size: ${fontSizes.md};
    border: 1px solid ${colors.neutral[300]};
    border-radius: ${borderRadius.sm};
  }

  button {
    width: 100%;
    padding: ${spacing.sm};
    font-size: ${fontSizes.md};
    background: ${colors.primary};
    color: ${colors.text.inverted};
    border: none;
    border-radius: ${borderRadius.sm};
    cursor: pointer;
    &:disabled {
      background: ${colors.neutral[300]};
      cursor: not-allowed;
    }
  }
`;

export const Error = styled.p`
  color: ${colors.error};
  font-size: ${fontSizes.sm};
  text-align: center;
`;
