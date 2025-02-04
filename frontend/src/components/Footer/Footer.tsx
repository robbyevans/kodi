import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import * as S from "./styles";

const Footer: React.FC = () => {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.FooterText>© kodi 2025</S.FooterText>
        <S.SocialIcons>
          <S.SocialIconLink
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </S.SocialIconLink>
          <S.SocialIconLink
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </S.SocialIconLink>
          <S.SocialIconLink
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </S.SocialIconLink>
        </S.SocialIcons>
      </S.FooterContent>
    </S.FooterContainer>
  );
};

export default Footer;
