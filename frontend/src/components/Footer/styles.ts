import styled from "styled-components";
import { colors, fontSizes, spacing } from "../../styles/foundation";

export const FooterContainer = styled.footer`
  background-color: ${colors.primary};
  color: ${colors.text.inverted};
  text-align: center;
  padding: ${spacing.sm};
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: 768px) {
    font-size: ${fontSizes.sm};
  }
`;

export const FooterText = styled.p`
  font-size: ${fontSizes.base};
  margin: 0;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: ${fontSizes.sm};
  }
`;
