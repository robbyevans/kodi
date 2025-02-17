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

const menuItems = [
  { path: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  { path: "/settings", icon: <FiSettings />, label: "Settings" },
  { path: "/profile", icon: <FiUser />, label: "Profile" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAdmins();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Track the active menu item (default to dashboard)
  const [activePath, setActivePath] = useState("/dashboard");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleNavigation = (path: string) => {
    setActivePath(path);
    navigate(path);
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  const renderMenuItems = () => (
    <>
      {menuItems.map(({ path, icon, label }) => (
        <S.MenuItem
          key={path}
          onClick={() => handleNavigation(path)}
          active={activePath === path}
        >
          {icon}
          <S.MenuText>{label}</S.MenuText>
        </S.MenuItem>
      ))}
      <S.LogoutItem onClick={handleLogout}>
        <FiLogOut />
        <S.MenuText>Logout</S.MenuText>
      </S.LogoutItem>
    </>
  );

  return (
    <>
      <S.MobileMenuIcon onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </S.MobileMenuIcon>

      <S.SidebarContainer>
        <div>
          <S.SidebarHeader />
          <S.Menu>{renderMenuItems()}</S.Menu>
        </div>
      </S.SidebarContainer>

      {isMobileMenuOpen && (
        <S.MobileDropdown>{renderMenuItems()}</S.MobileDropdown>
      )}
    </>
  );
};

export default Sidebar;
