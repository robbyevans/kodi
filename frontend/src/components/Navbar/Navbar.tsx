import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";
import { FiHome, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import Notification from "../Notification/Notification";
import * as S from "./styles";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAdmins();

  return (
    <S.SidebarContainer>
      <div>
        <S.SidebarHeader>
          <S.Title>Kodi</S.Title>
          <S.WelcomeText>Welcome Admin</S.WelcomeText>
        </S.SidebarHeader>
        <S.Menu>
          <S.MenuItem onClick={() => navigate("/dashboard")}>
            <FiHome />
            <S.MenuText>Dashboard</S.MenuText>
          </S.MenuItem>
          <S.MenuItem onClick={() => navigate("/settings")}>
            <FiSettings />
            <S.MenuText>Settings</S.MenuText>
          </S.MenuItem>
          <S.MenuItem onClick={() => navigate("/profile")}>
            <FiUser />
            <S.MenuText>Profile</S.MenuText>
          </S.MenuItem>
          <S.MenuItem>
            <Notification />
            <S.MenuText>Notifications</S.MenuText>
          </S.MenuItem>
        </S.Menu>
      </div>
      <S.LogoutItem onClick={handleLogout}>
        <FiLogOut />
        <S.MenuText>Logout</S.MenuText>
      </S.LogoutItem>
    </S.SidebarContainer>
  );
};

export default Sidebar;
