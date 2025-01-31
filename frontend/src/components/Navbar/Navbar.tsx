// File: /frontend/src/components/Navbar/Navbar.tsx
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
  const { logout } = useAdmins();

  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  const navigateToSettings = () => navigate("/settings");

  return (
    <S.NavbarContainer>
      <S.NavButton onClick={handleBack}>
        <FiArrowLeft />
      </S.NavButton>
      <S.NavButton onClick={handleForward}>
        <FiArrowRight />
      </S.NavButton>
      <S.Title>App Name</S.Title>
      <S.IconButton onClick={navigateToSettings}>
        <FiSettings />
      </S.IconButton>
      <S.IconButton onClick={logout}>
        <FiLogOut />
      </S.IconButton>
    </S.NavbarContainer>
  );
};

export default Navbar;
