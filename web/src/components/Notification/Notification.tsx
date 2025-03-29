import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import * as S from "./styles";

export interface NotificationItem {
  id: number;
  type: "system" | "other";
  title: string;
  content: string;
  onHandleClick: () => void;
}

interface NotificationProps {
  notifications: NotificationItem[];
}

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const count = notifications.length;

  return (
    <S.NotificationContainer>
      <S.NotificationIcon onClick={toggleDropdown}>
        <IoMdNotificationsOutline color="#ffffff" />
        {count > 0 && <S.NotificationBadge>{count}</S.NotificationBadge>}
      </S.NotificationIcon>

      {isOpen && (
        <S.NotificationDropdown>
          {count === 0 && <S.EmptyMessage>No notifications.</S.EmptyMessage>}

          {notifications.map((notif) => (
            <S.NotificationItem key={notif.id}>
              <S.NotificationHeader>
                <S.NotificationTitle>{notif.title}</S.NotificationTitle>
                <S.ViewButton onClick={notif.onHandleClick}>View</S.ViewButton>
              </S.NotificationHeader>
              <S.NotificationContent>{notif.content}</S.NotificationContent>
            </S.NotificationItem>
          ))}

          <S.CloseButton onClick={() => setIsOpen(false)}>Close</S.CloseButton>
        </S.NotificationDropdown>
      )}
    </S.NotificationContainer>
  );
};

export default Notification;
