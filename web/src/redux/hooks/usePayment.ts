import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchPropertyPayments,
  fetchMonthlyPropertyPayments,
  fetchYearlyPropertyPayments,
} from "../slices/paymentSlice";

export const usePayments = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: any) => state.payments
  );

  /**
   * Retrieves all payment data for the property identified by its short code.
   */
  const getPropertyPayments = (shortCode: string) => {
    dispatch(fetchPropertyPayments(shortCode));
  };

  /**
   * Retrieves payment data for a specific property filtered by both month and year.
   */
  const getMonthlyPaymentData = (
    shortCode: string,
    month: number,
    year: number
  ) => {
    dispatch(fetchMonthlyPropertyPayments({ shortCode, month, year }));
  };

  /**
   * Retrieves payment data for a specific property filtered by year.
   */
  const getYearlyPaymentData = (shortCode: string, year: number) => {
    dispatch(fetchYearlyPropertyPayments({ shortCode, year }));
  };

  return {
    data,
    loading,
    error,
    getPropertyPayments,
    getMonthlyPaymentData,
    getYearlyPaymentData,
  };
};
