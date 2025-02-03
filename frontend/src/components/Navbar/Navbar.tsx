import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";
import {
  FiArrowLeft,
  FiArrowRight,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import * as S from "./styles";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAdmins();

  return (
    <S.NavbarContainer>
      <S.NavGroup>
        <S.NavButton onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </S.NavButton>
        <S.NavButton onClick={() => navigate(1)}>
          <FiArrowRight />
        </S.NavButton>
      </S.NavGroup>

      <S.Title>Kodi</S.Title>

      <S.NavGroup>
        <S.IconButton onClick={() => navigate("/settings")}>
          <FiSettings />
        </S.IconButton>
        <S.IconButton onClick={handleLogout}>
          <FiLogOut />
        </S.IconButton>
      </S.NavGroup>
    </S.NavbarContainer>
  );
};

export default Navbar;
