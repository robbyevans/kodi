import styled from "styled-components";
import { colors, fontSizes, spacing } from "../../styles/foundation";

export const FooterContainer = styled.footer`
  background-color: ${colors.primary};
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
`;

export const SocialIconLink = styled.a`
  color: ${colors.text.inverted};
  font-size: ${fontSizes.lg};
  margin: 0 ${spacing.sm};
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${colors.accent};
    transform: scale(1.1);
  }
`;

export const FooterText = styled.p`
  color: ${colors.text.inverted};
  font-size: ${fontSizes.base};
  margin: 0;
  letter-spacing: 0.5px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: ${fontSizes.sm};
  }
`;
