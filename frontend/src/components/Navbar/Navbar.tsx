import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import * as S from "./styles";
import Notification from "../Notification/Notification";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAdmins();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navigateAndClose = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <S.NavbarContainer>
      <S.NavbarLeft>
        <S.Title>Kodi</S.Title>
        <S.WelcomeText>Welcome Admin</S.WelcomeText>
      </S.NavbarLeft>

      <S.NavbarRight>
        {/* Desktop Menu */}
        <S.DesktopMenu>
          <S.IconButton
            onClick={() => navigate("/dashboard")}
            title="Dashboard"
          >
            <FiHome />
          </S.IconButton>
          <S.IconButton onClick={() => navigate("/settings")} title="Settings">
            <FiSettings />
          </S.IconButton>
          <S.IconButton onClick={handleLogout} title="Logout">
            <FiLogOut />
          </S.IconButton>
          <S.IconButton onClick={() => navigate("/profile")} title="Profile">
            <FiUser />
          </S.IconButton>
          <S.IconButton>
            <Notification />
          </S.IconButton>
        </S.DesktopMenu>

        {/* Mobile Menu Button */}
        <S.MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </S.MobileMenuButton>
      </S.NavbarRight>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <S.MobileMenu>
          <S.MobileMenuItem onClick={() => navigateAndClose("/dashboard")}>
            <FiHome /> Dashboard
          </S.MobileMenuItem>
          <S.MobileMenuItem onClick={() => navigateAndClose("/settings")}>
            <FiSettings /> Settings
          </S.MobileMenuItem>
          <S.MobileMenuItem
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
          >
            <FiLogOut /> Logout
          </S.MobileMenuItem>
          <S.MobileMenuItem onClick={() => navigateAndClose("/profile")}>
            <FiUser /> Profile
          </S.MobileMenuItem>
          <S.MobileMenuItem>
            <Notification />
          </S.MobileMenuItem>
        </S.MobileMenu>
      )}
    </S.NavbarContainer>
  );
};

export default Navbar;
