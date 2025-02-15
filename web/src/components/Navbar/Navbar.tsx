import React, { useState } from "react";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import * as S from "./styles";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Search from "../Search/Search";

const dummyNotifications = [
  {
    id: 1,
    title: "New Message",
    content: "You have a new message from John Doe.",
  },
  {
    id: 2,
    title: "System Update",
    content: "Your system has been updated to the latest version.",
  },
  {
    id: 3,
    title: "Reminder",
    content: "Don't forget to check your tasks.",
  },
];

const Navbar: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const toggleCalendar = () => setShowCalendar((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  return (
    <S.Navbar>
      <S.AppName onClick={() => navigate("/dashboard")}>KODI</S.AppName>
      <S.NavActions>
        <Search isVisible={showSearch} />
        <S.IconButton onClick={toggleSearch} aria-label="Search">
          <FaSearch />
        </S.IconButton>
        <S.IconButton onClick={toggleCalendar} aria-label="Calendar">
          <FaCalendarAlt />
        </S.IconButton>
        <ThemeToggle />
        <Notification notifications={dummyNotifications} />
      </S.NavActions>

      {showCalendar && (
        <S.Dropdown>
          <Calendar onChange={setDate} value={date} />
        </S.Dropdown>
      )}
    </S.Navbar>
  );
};

export default Navbar;
