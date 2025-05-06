import styled from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
} from "../../styles/foundation";

export const Container = styled.div`
  max-width: 600px;
  margin: ${spacing["2xl"]} auto;
  padding: ${spacing.xl};
  background: ${colors.text.inverted};
  border-radius: ${borderRadius.md};

  h1 {
    margin-bottom: ${spacing.lg};
    text-align: center;
    color: ${colors.text.primary};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: ${spacing.sm};
    border: 1px solid ${colors.neutral[300]};
    border-radius: ${borderRadius.sm};
    font-size: ${fontSizes.md};
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  button {
    align-self: flex-start;
    padding: ${spacing.sm} ${spacing.md};
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

export const RadioGroup = styled.div`
  display: flex;
  gap: ${spacing.lg};
  label {
    font-size: ${fontSizes.md};
    cursor: pointer;
    input {
      margin-right: ${spacing.sm};
    }
  }
`;

export const MultiSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: ${spacing.md};

  label {
    font-size: ${fontSizes.md};
    cursor: pointer;
    input {
      margin-right: ${spacing.sm};
    }
  }
`;

export const Error = styled.p`
  color: ${colors.error};
  font-size: ${fontSizes.sm};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};

  label {
    font-size: ${fontSizes.sm};
    color: ${colors.text.primary};
  }

  select {
    padding: ${spacing.sm};
    font-size: ${fontSizes.md};
    border: 1px solid ${colors.neutral[300]};
    border-radius: ${borderRadius.sm};
  }
  input {
    height: 25px;
  }
`;
