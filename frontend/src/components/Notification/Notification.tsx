import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import * as S from "./styles";

const notifications = [
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
    content: "Don't forget to complete your profile setup.",
  },
];

const Notification = () => {
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
