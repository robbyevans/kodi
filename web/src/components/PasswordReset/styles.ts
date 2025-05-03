import styled from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
} from "../../styles/foundation";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.lg};
  min-height: 100vh;
  background: ${colors.background};
  width: 100%;
`;

export const BackButton = styled.button`
  position: absolute;
  top: ${spacing.lg};
  left: ${spacing.lg};
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  padding: ${spacing.lg};
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};
  text-align: center;

  h1 {
    margin-bottom: ${spacing.lg};
    font-size: ${fontSizes.xl};
    color: ${colors.text.primary};
  }
  form {
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
  }
`;

/** Panels: only the active one is editable & fully opaque */
export const Section = styled.div<{ active: boolean }>`
  opacity: ${(p) => (p.active ? 1 : 0.5)};
  pointer-events: ${(p) => (p.active ? "auto" : "none")};
  transition: opacity 0.2s;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${colors.neutral[200]};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};

  label {
    font-size: ${fontSizes.sm};
    color: ${colors.text.secondary};
    text-align: left;
  }
  input {
    padding: ${spacing.sm};
    font-size: ${fontSizes.md};
    border: 1px solid ${colors.neutral[300]};
    border-radius: ${borderRadius.sm};
    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }
  }
`;

export const ResendContainer = styled.div`
  margin-top: ${spacing.xs};
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
  text-align: left;
`;

export const ResendButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitSmallButton = styled.button`
  align-self: flex-end;
  padding: ${spacing.xs} ${spacing.sm};
  font-size: ${fontSizes.sm};
  background: ${colors.primary};
  color: ${colors.text.inverted};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  &:disabled {
    background: ${colors.neutral[300]};
    cursor: not-allowed;
  }
`;

export const ErrorAlert = styled.div`
  margin-top: ${spacing.sm};
  color: ${colors.error};
  background: ${colors.warning};
  padding: ${spacing.sm};
  border-left: 4px solid ${colors.error};
  border-radius: ${borderRadius.sm};
`;
