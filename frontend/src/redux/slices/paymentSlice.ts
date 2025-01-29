// src/redux/slices/paymentSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

export interface IPayment {
  transaction_id: string;
  bill_ref_number: string;
  msisdn: string;
  transaction_amount: number;
  transaction_type: string;
  payment_date: string;
  short_code: string;
  status: string;
}

interface PaymentState {
  payments: IPayment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => {
    const response = await axiosInstance.get("/api/payments");
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch payments";
      });
  },
});

export default paymentSlice.reducer;
