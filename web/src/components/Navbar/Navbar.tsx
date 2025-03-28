// File: /web/src/components/Navbar/Navbar.tsx

import React, { useState } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Search from "../Search/Search";
import NotificationContainer from "../../containers/NotificationContainer";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const navigate = useNavigate();

  const toggleSearch = () => setShowSearch((prev) => !prev);
  const toggleMoreMenu = () => setShowMoreMenu((prev) => !prev);

  return (
    <S.Navbar>
      <S.AppName onClick={() => navigate("/dashboard")}>KODI</S.AppName>

      <S.NavActions>
        <Search isVisible={showSearch} />
        <S.IconButton onClick={toggleSearch} aria-label="Search">
          <FaSearch />
        </S.IconButton>

        <S.LargeScreenActions>
          <ThemeToggle />
          <NotificationContainer />
        </S.LargeScreenActions>

        <S.SmallScreenActions>
          <S.IconButton onClick={toggleMoreMenu} aria-label="More">
            <FaEllipsisV />
          </S.IconButton>
          {showMoreMenu && (
            <S.MoreDropdown>{/* Add more actions if needed */}</S.MoreDropdown>
          )}
        </S.SmallScreenActions>
      </S.NavActions>
    </S.Navbar>
  );
};

export default Navbar;
