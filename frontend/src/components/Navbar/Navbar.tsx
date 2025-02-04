// Navbar.tsx
import React, { useState } from "react";
import { FaCalendarAlt, FaMoon, FaSun } from "react-icons/fa";
import * as S from "./styles";
import Notification from "../Notification/Notification";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  return (
    <S.Navbar isDarkMode={isDarkMode}>
      <S.AppName>Kodi</S.AppName>
      <S.NavActions>
        <S.IconButton onClick={toggleCalendar} aria-label="Toggle calendar">
          <FaCalendarAlt />
        </S.IconButton>
        <S.IconButton aria-label="Notifications">
          <Notification />
        </S.IconButton>
        <S.IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </S.IconButton>
      </S.NavActions>
      {showCalendar && <S.Calendar>📅 Calendar Placeholder</S.Calendar>}
    </S.Navbar>
  );
};

export default Navbar;
