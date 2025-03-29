import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { IoAnalytics } from "react-icons/io5";
import styled from "styled-components";
import { colors } from "../../styles/foundation";
import { useAdmins } from "../../redux/hooks/useAdmin";

const FooterContainer = styled.footer`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 5px 5px 10px;
    background: ${colors.primary};
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.2);
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
  }
`;

const FooterButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  color: ${(props) =>
    props.$active ? colors.secondary : colors.text.inverted};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  gap: 3px;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const FooterMobile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useAdmins();

  const menu = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FiHome />,
      action: () => navigate("/dashboard"),
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: <IoAnalytics />,
      action: () => navigate("/analytics"),
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <FiSettings />,
      action: () => navigate("/settings"),
    },
    {
      path: "/logout",
      label: "Logout",
      icon: <FiLogOut />,
      action: handleLogout,
    },
  ];

  return (
    <FooterContainer>
      {menu.map(({ path, label, icon, action }) => (
        <FooterButton
          key={path}
          onClick={action}
          $active={location.pathname === path}
        >
          {icon}
          <span>{label}</span>
        </FooterButton>
      ))}
    </FooterContainer>
  );
};

export default FooterMobile;
