// File: /frontend/src/components/Navbar/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import * as S from "./styles";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);
  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out...");
  };

  return (
    <S.NavbarContainer>
      <S.NavButton onClick={handleBack}>
        <FiArrowLeft />
      </S.NavButton>
      <S.NavButton onClick={handleForward}>
        <FiArrowRight />
      </S.NavButton>
      <S.Title>App Name</S.Title>
      <S.IconButton>
        <FiSettings />
      </S.IconButton>
      <S.IconButton onClick={handleLogout}>
        <FiLogOut />
      </S.IconButton>
    </S.NavbarContainer>
  );
};

export default Navbar;
