import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchTenants,
  sendNotification,
} from "../slices/tenantNotificationSlice";

export const useTenantNotifications = () => {
  const dispatch = useAppDispatch();
  const { tenants, loading, error } = useAppSelector(
    (s) => s.tenantNotifications
  );

  return {
    tenants,
    loading,
    error,
    loadTenants: () => dispatch(fetchTenants()),
    send: (tenantIds: number[], subject: string, body: string) =>
      dispatch(sendNotification({ tenantIds, subject, body })),
  };
};
