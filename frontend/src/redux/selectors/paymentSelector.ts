// src/redux/selectors/paymentSelector.ts
import { RootState } from "../store";

export const selectPayments = (state: RootState) => state.payment.payments;
export const selectPaymentsLoading = (state: RootState) =>
  state.payment.loading;
export const selectPaymentsError = (state: RootState) => state.payment.error;
