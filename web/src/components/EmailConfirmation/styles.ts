import styled from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
} from "../../styles/foundation";

export const Section = styled.section`
  margin: ${spacing.lg} 0;
  padding: ${spacing.lg};
  background: ${colors.neutral[500]};
  border-radius: ${borderRadius.sm};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: ${spacing.md};
    color: ${colors.text.primary};
  }

  button {
    margin-right: ${spacing.sm};
    padding: ${spacing.sm} ${spacing.md};
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

export const Input = styled.input`
  display: inline-block;
  margin-right: ${spacing.sm};
  padding: ${spacing.sm};
  font-size: ${fontSizes.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
`;

export const Error = styled.p`
  margin-top: ${spacing.sm};
  color: ${colors.error};
  font-size: ${fontSizes.sm};
`;
