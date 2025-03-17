import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchPaymentsByProperty,
  fetchMonthlyPropertyPayments,
  fetchYearlyPropertyPayments,
  fetchAllPaymentData,
} from "../slices/paymentSlice";

export const usePayments = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.payments);

  const getPaymentsByProperty = (propertyId: string) => {
    dispatch(fetchPaymentsByProperty(propertyId));
  };

  const getMonthlyPayments = (
    propertyId: string,
    month: number,
    year: number
  ) => {
    dispatch(fetchMonthlyPropertyPayments({ propertyId, month, year }));
  };

  const getYearlyPayments = (propertyId: string, year: number) => {
    dispatch(fetchYearlyPropertyPayments({ propertyId, year }));
  };

  const getAllPayments = (year: number, month?: number) => {
    dispatch(fetchAllPaymentData({ year, month }));
  };

  return {
    data,
    loading,
    error,
    getPaymentsByProperty,
    getMonthlyPayments,
    getYearlyPayments,
    getAllPayments,
  };
};
