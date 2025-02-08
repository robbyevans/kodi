import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import * as S from "./styles";

export interface NotificationItem {
  id: number;
  title: string;
  content: string;
}

interface NotificationProps {
  notifications: NotificationItem[];
}

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedNotificationId, setExpandedNotificationId] = useState<
    number | null
  >(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleNotification = (id: number) => {
    setExpandedNotificationId(expandedNotificationId === id ? null : id);
  };

  return (
    <S.NotificationContainer>
      <S.NotificationIcon onClick={toggleDropdown}>
        <IoMdNotificationsOutline />
        {notifications.length > 0 && (
          <S.NotificationBadge>{notifications.length}</S.NotificationBadge>
        )}
      </S.NotificationIcon>

      {isOpen && (
        <S.NotificationDropdown>
          {notifications.map((notification) => (
            <S.NotificationItem
              key={notification.id}
              onClick={() => toggleNotification(notification.id)}
            >
              <S.NotificationTitle>{notification.title}</S.NotificationTitle>
              {expandedNotificationId === notification.id && (
                <S.NotificationContent>
                  {notification.content}
                </S.NotificationContent>
              )}
            </S.NotificationItem>
          ))}
          <S.CloseButton onClick={() => setIsOpen(false)}>Close</S.CloseButton>
        </S.NotificationDropdown>
      )}
    </S.NotificationContainer>
  );
};

export default Notification;
