// File: /web/src/components/Navbar/Navbar.tsx
import React, { useState } from "react";
import { FaCalendarAlt, FaSearch, FaEllipsisV } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Search from "../Search/Search";

// We import the container, not the raw Notification
import NotificationContainer from "../../containers/NotificationContainer";

const Navbar: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const navigate = useNavigate();

  const toggleCalendar = () => setShowCalendar((prev) => !prev);
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
          <S.IconButton onClick={toggleCalendar} aria-label="Calendar">
            <FaCalendarAlt />
          </S.IconButton>
          <ThemeToggle />

          {/* Render the container that shows notifications (unsettled payments) */}
          <NotificationContainer />
        </S.LargeScreenActions>

        <S.SmallScreenActions>
          <S.IconButton onClick={toggleMoreMenu} aria-label="More">
            <FaEllipsisV />
          </S.IconButton>
          {showMoreMenu && (
            <S.MoreDropdown>
              {/* Some small-screen actions if needed */}
            </S.MoreDropdown>
          )}
        </S.SmallScreenActions>
      </S.NavActions>

      {showCalendar && (
        <S.Dropdown>
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) setDate(value);
            }}
            value={date}
          />
        </S.Dropdown>
      )}
    </S.Navbar>
  );
};

export default Navbar;
