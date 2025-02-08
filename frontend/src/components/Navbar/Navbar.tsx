import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import * as S from "./styles";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  return (
    <S.Navbar isDarkMode={isDarkMode}>
      <S.AppName onClick={() => navigate("/dashboard")}>Kodi</S.AppName>
      <S.NavActions>
        <S.IconButton aria-label="Search">
          <FaSearch />
        </S.IconButton>
        <S.IconButton onClick={toggleCalendar} aria-label="Toggle calendar">
          <FaCalendarAlt />
        </S.IconButton>
        <S.IconButton aria-label="Notifications">
          <Notification />
        </S.IconButton>
        <S.IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </S.IconButton>
        <S.IconButton onClick={toggleProfileMenu} aria-label="Profile menu">
          <FaUserCircle />
        </S.IconButton>
      </S.NavActions>

      {showCalendar && (
        <S.Dropdown>
          <Calendar onChange={setDate} value={date} />
        </S.Dropdown>
      )}

      {showProfileMenu && (
        <S.Dropdown>
          <S.MenuItem onClick={() => navigate("/profile")}>Profile</S.MenuItem>
          <S.MenuItem onClick={() => navigate("/settings")}>
            Settings
          </S.MenuItem>
          <S.MenuItem onClick={() => navigate("/logout")}>Logout</S.MenuItem>
        </S.Dropdown>
      )}
    </S.Navbar>
  );
};

export default Navbar;
