import { RootState } from "../store";

export const selectPaymentData = (state: RootState) => state.payments.data;
export const selectPaymentLoading = (state: RootState) =>
  state.payments.loading;
export const selectPaymentError = (state: RootState) => state.payments.error;
