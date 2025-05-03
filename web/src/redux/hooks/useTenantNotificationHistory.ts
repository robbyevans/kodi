import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchHistories,
  fetchHistory,
  clearSelected,
} from "../slices/tenantNotificationHistorySlice";

export const useTenantNotificationHistory = () => {
  const dispatch = useAppDispatch();
  const { histories, selected, loading, error } = useAppSelector(
    (s) => s.tenantNotificationHistory
  );

  return {
    histories,
    selected,
    loading,
    error,
    loadHistories: () => dispatch(fetchHistories()),
    loadHistory: (id: number) => dispatch(fetchHistory(id)),
    clear: () => dispatch(clearSelected()),
  };
};
