import styled from "styled-components";
import { colors, fonts, fontSizes, spacing } from "../../styles/foundation";

export const SettingsContainer = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: ${spacing["2xl"]} ${spacing.xl};
  font-family: ${fonts.primary};
  color: ${colors.text.primary};

  @media (max-width: 768px) {
    padding: ${spacing.lg} ${spacing.md};
  }
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
      font-size: ${fontSizes.base};
    }
  }
`;
