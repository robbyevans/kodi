import React from "react";
import * as S from "./styles";

const LoadingPage = () => {
  return (
    <S.LoadingContainer>
      <S.FadeIn>KODI</S.FadeIn>
      <S.FadeIn className="delay">Property management made easy</S.FadeIn>
    </S.LoadingContainer>
  );
};

export default LoadingPage;
