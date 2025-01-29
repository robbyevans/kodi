// src/hooks/usePayment.ts
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../slices/paymentSlice";
import {
  selectPayments,
  selectPaymentsLoading,
  selectPaymentsError,
} from "../selectors/paymentSelector";
import { useEffect } from "react";

export const usePayment = () => {
  const dispatch = useDispatch();
  const paymentsData = useSelector(selectPayments);
  const loading = useSelector(selectPaymentsLoading);
  const error = useSelector(selectPaymentsError);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  // Listen for new payments, could be done via WebSocket or polling
  // This is where you could add real-time updates.

  return { paymentsData, loading, error };
};
