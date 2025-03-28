import { FiWifiOff } from "react-icons/fi";
import * as S from "./styles";

const OfflinePage = () => (
  <S.Container>
    <S.Icon>
      <FiWifiOff />
    </S.Icon>
    <S.Title>No Internet Connection</S.Title>
    <S.Message>Please check your connection and try again.</S.Message>
  </S.Container>
);

export default OfflinePage;
