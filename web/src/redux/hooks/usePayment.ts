import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchPaymentsByProperties,
  fetchMonthlyPropertyPayments,
  fetchYearlyPropertyPayments,
  fetchAllPaymentData,
  fetchWalletBalance,
  initiateWithdrawal,
  fetchLedgerEntries,
} from "../slices/paymentSlice";

export const usePayments = () => {
  const dispatch = useAppDispatch();
  const { data, ledger, wallet, loading, error } = useAppSelector(
    (state) => state.payments
  );

  const getPaymentsByProperties = (filters: {
    propertyIds?: string[];
    propertyId?: string;
    settled?: boolean;
    month?: number;
    year?: number;
  }) => {
    dispatch(fetchPaymentsByProperties(filters));
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

  const getWalletBalance = () => {
    dispatch(fetchWalletBalance());
  };

  const initiateWithdrawalRequest = (
    amount: number,
    withdrawal_type: string,
    recipient_details: any
  ) => {
    dispatch(
      initiateWithdrawal({ amount, withdrawal_type, recipient_details })
    );
  };

  const getLedgerEntries = () => {
    dispatch(fetchLedgerEntries());
  };

  return {
    data,
    ledger,
    wallet,
    loading,
    error,
    getPaymentsByProperties,
    getMonthlyPayments,
    getYearlyPayments,
    getAllPayments,
    getWalletBalance,
    initiateWithdrawalRequest,
    getLedgerEntries,
  };
};
