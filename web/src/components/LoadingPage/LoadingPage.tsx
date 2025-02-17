import { FiHome } from "react-icons/fi";
import * as S from "./styles";

const LoadingPage = () => {
  return (
    <S.LoadingContainer>
      <S.LogoContainer>
        <S.AnimatedIcon>
          <FiHome />
        </S.AnimatedIcon>
        <S.FadeInText>KODI</S.FadeInText>
      </S.LogoContainer>
      <S.ProgressBar>
        <S.ProgressFill />
      </S.ProgressBar>
    </S.LoadingContainer>
  );
};

export default LoadingPage;
