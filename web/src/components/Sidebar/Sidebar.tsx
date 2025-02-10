import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import * as S from "./styles";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAdmins();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // When on mobile, close the menu after navigating.
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      {/* Hamburger menu icon (visible on small screens only) */}
      <S.MobileMenuIcon onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </S.MobileMenuIcon>

      {/* Full sidebar (visible on large screens only) */}
      <S.SidebarContainer>
        <div>
          <S.SidebarHeader>
            {/* You can add a logo or title here */}
          </S.SidebarHeader>
          <S.Menu>
            <S.MenuItem onClick={() => handleNavigation("/dashboard")}>
              <FiHome />
              <S.MenuText>Dashboard</S.MenuText>
            </S.MenuItem>
            <S.MenuItem onClick={() => handleNavigation("/settings")}>
              <FiSettings />
              <S.MenuText>Settings</S.MenuText>
            </S.MenuItem>
            <S.MenuItem onClick={() => handleNavigation("/profile")}>
              <FiUser />
              <S.MenuText>Profile</S.MenuText>
            </S.MenuItem>
          </S.Menu>
        </div>
        <S.LogoutItem onClick={handleLogout}>
          <FiLogOut />
          <S.MenuText>Logout</S.MenuText>
        </S.LogoutItem>
      </S.SidebarContainer>

      {/* Mobile dropdown menu (visible on small screens only) */}
      {isMobileMenuOpen && (
        <S.MobileDropdown>
          <S.MenuItem onClick={() => handleNavigation("/dashboard")}>
            <FiHome />
            <S.MenuText>Dashboard</S.MenuText>
          </S.MenuItem>
          <S.MenuItem onClick={() => handleNavigation("/settings")}>
            <FiSettings />
            <S.MenuText>Settings</S.MenuText>
          </S.MenuItem>
          <S.MenuItem onClick={() => handleNavigation("/profile")}>
            <FiUser />
            <S.MenuText>Profile</S.MenuText>
          </S.MenuItem>
          <S.LogoutItem onClick={handleLogout}>
            <FiLogOut />
            <S.MenuText>Logout</S.MenuText>
          </S.LogoutItem>
        </S.MobileDropdown>
      )}
    </>
  );
};

export default Sidebar;
