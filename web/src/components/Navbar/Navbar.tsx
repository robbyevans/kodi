import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import Search from "../Search/Search";
import NotificationContainer from "../../containers/NotificationContainer";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const toggleSearch = () => setShowSearch((prev) => !prev);

  return (
    <S.Navbar>
      <S.AppName onClick={() => navigate("/dashboard")}>KODI</S.AppName>

      <S.NavActions>
        <Search isVisible={showSearch} />
        <S.IconButton onClick={toggleSearch} aria-label="Search">
          <FaSearch />
        </S.IconButton>
        <NotificationContainer />
      </S.NavActions>
    </S.Navbar>
  );
};

export default Navbar;
