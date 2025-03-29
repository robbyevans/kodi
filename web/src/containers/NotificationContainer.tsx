import React from "react";
import Notification, {
  NotificationItem,
} from "../components/Notification/Notification";

const NotificationContainer: React.FC = () => {
  const notificationsData: NotificationItem[] = [
    {
      id: 1,
      type: "system",
      title: "New System Update",
      content: "Version 2.0 has been released with new features.",
      onHandleClick: () => alert("Viewing update 1"),
    },
    {
      id: 2,
      type: "other",
      title: "Upcoming Maintenance",
      content: "System maintenance scheduled for tomorrow at 10:00 AM.",
      onHandleClick: () => alert("Viewing update 2"),
    },
    {
      id: 3,
      type: "system",
      title: "New Feature Alert",
      content: "You can now download payment statements in PDF.",
      onHandleClick: () => alert("Viewing update 3"),
    },
  ];

  return <Notification notifications={notificationsData} />;
};

export default NotificationContainer;
