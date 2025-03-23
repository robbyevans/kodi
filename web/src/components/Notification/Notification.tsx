// File: /web/src/components/Notification/Notification.tsx
import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import * as S from "./styles";

export interface NotificationItem {
  id: number;
  type: "unsettledPayment" | "system" | "other";
  title: string;
  senderContacts: string;
  content: string;
  paymentId?: number;
}

interface NotificationProps {
  notifications: NotificationItem[];
  onViewUnsettledPayment?: (paymentId: number) => void;
}

const Notification: React.FC<NotificationProps> = ({
  notifications,
  onViewUnsettledPayment,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const count = notifications.length;

  return (
    <S.NotificationContainer>
      <S.NotificationIcon onClick={toggleDropdown}>
        <IoMdNotificationsOutline />
        {count > 0 && <S.NotificationBadge>{count}</S.NotificationBadge>}
      </S.NotificationIcon>

      {isOpen && (
        <S.NotificationDropdown>
          {count === 0 && <S.EmptyMessage>No notifications.</S.EmptyMessage>}

          {notifications.map((notif) => (
            <S.NotificationItem key={notif.id}>
              <S.NotificationHeader>
                <S.NotificationTitle>{notif.title}</S.NotificationTitle>

                {notif.type === "unsettledPayment" && notif.paymentId && (
                  <S.ViewButton
                    onClick={() => onViewUnsettledPayment?.(notif.paymentId!)}
                  >
                    View
                  </S.ViewButton>
                )}
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
