// File: /web/src/redux/hooks/useNotifications.ts

import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchNotifications,
  removeNotification,
} from "../slices/notificationSlice";

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.notifications
  );

  const loadNotifications = () => {
    dispatch(fetchNotifications());
  };

  const dismissNotification = (id: number) => {
    dispatch(removeNotification(id));
  };

  return {
    notifications: items,
    loading,
    error,
    loadNotifications,
    dismissNotification,
  };
};
