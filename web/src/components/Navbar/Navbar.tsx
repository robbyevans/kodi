import React, { useState } from "react";
import { FaCalendarAlt, FaSearch, FaEllipsisV } from "react-icons/fa";
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
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const navigate = useNavigate();

  const toggleCalendar = () => setShowCalendar((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);
  const toggleMoreMenu = () => setShowMoreMenu((prev) => !prev);

  return (
    <S.Navbar>
      <S.AppName onClick={() => navigate("/dashboard")}>KODI</S.AppName>
      <S.NavActions>
        {/* Search icon always visible */}
        <Search isVisible={showSearch} />
        <S.IconButton onClick={toggleSearch} aria-label="Search">
          <FaSearch />
        </S.IconButton>

        {/* Large screen actions */}
        <S.LargeScreenActions>
          <S.IconButton onClick={toggleCalendar} aria-label="Calendar">
            <FaCalendarAlt />
          </S.IconButton>
          <ThemeToggle />
          <Notification notifications={dummyNotifications} />
        </S.LargeScreenActions>

        {/* Small screen: show three-dots icon */}
        <S.SmallScreenActions>
          <S.IconButton onClick={toggleMoreMenu} aria-label="More">
            <FaEllipsisV />
          </S.IconButton>
          {showMoreMenu && (
            <S.MoreDropdown>
              {/* <S.MenuItem
                onClick={() => {
                  toggleCalendar();
                  setShowMoreMenu(false);
                }}
              >
                Calendar
              </S.MenuItem> */}
              {/* <S.MenuItem onClick={() => setShowMoreMenu(false)}>
                <ThemeToggle />
              </S.MenuItem> */}
              <S.MenuItem onClick={() => setShowMoreMenu(false)}>
                <Notification notifications={dummyNotifications} />
              </S.MenuItem>
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
