import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";
import { FiSettings, FiLogOut, FiUsers } from "react-icons/fi";
import { TbMailShare } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import * as S from "./styles";

const menuItems = [
  { path: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
  { path: "/analytics", icon: <IoAnalytics />, label: "Analytics" },
  {
    path: "/tenant-notifications",
    icon: <TbMailShare />,
    label: "Bulk Notification",
  },
  {
    path: "/assistant-admin",
    icon: <FiUsers />,
    label: "Assistants",
  },
  { path: "/settings", icon: <FiSettings />, label: "Settings" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAdmins();
  const [activePath, setActivePath] = useState("/dashboard");

  const handleNavigation = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  const renderMenuItems = () => (
    <>
      {menuItems.map(({ path, icon, label }) => (
        <S.MenuItem
          key={path}
          onClick={() => handleNavigation(path)}
          $active={activePath === path}
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
    <S.SidebarContainer>
      <div>
        <S.SidebarHeader />
        <S.Menu>{renderMenuItems()}</S.Menu>
      </div>
    </S.SidebarContainer>
  );
};

export default Sidebar;
