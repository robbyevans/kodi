import styled from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  spacing,
  borderRadius,
} from "../../styles/foundation";

export const SettingsContainer = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: ${spacing["2xl"]} ${spacing.xl};
  font-family: ${fonts.primary};
  color: ${colors.text.primary};
`;

export const SettingsHeader = styled.header`
  text-align: center;
  margin-bottom: ${spacing.xl};

  h1 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["3xl"]};
    color: ${colors.primary};
    margin-bottom: ${spacing.sm};

    @media (max-width: 768px) {
      font-size: ${fontSizes["2xl"]};
    }
  }

  p {
    font-size: ${fontSizes.lg};
    color: ${colors.text.secondary};

    @media (max-width: 768px) {
      font-size: ${fontSizes.md};
    }
  }
`;

export const LogoutWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    margin-top: ${spacing.lg};
  }
`;

export const LogoutButton = styled.button`
  background: ${colors.error};
  color: ${colors.text.inverted};
  border: none;
  padding: ${spacing.md} ${spacing.lg};
  font-size: ${fontSizes.md};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  width: 100%;
  max-width: 280px;
  transition: background 0.2s;

  &:hover {
    background: ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: ${fontSizes.sm};
    padding: ${spacing.sm} ${spacing.md};
  }
`;
