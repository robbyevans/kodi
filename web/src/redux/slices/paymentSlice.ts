import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";

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
  data: IPayment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  data: [],
  loading: false,
  error: null,
};

/**
 * By default, getPropertyPayments retrieves only payments for a given property,
 * identified by its short code.
 */
export const fetchPropertyPayments = createAsyncThunk(
  "payments/fetchPropertyPayments",
  async (shortCode: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { short_code: shortCode },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/**
 * getMonthlyPaymentData retrieves payments for a specific property filtered by both month and year.
 */
export const fetchMonthlyPropertyPayments = createAsyncThunk(
  "payments/fetchMonthlyPropertyPayments",
  async (
    {
      shortCode,
      month,
      year,
    }: { shortCode: string; month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { short_code: shortCode, month, year },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/**
 * getYearlyPaymentData retrieves payments for a specific property filtered by a given year.
 */
export const fetchYearlyPropertyPayments = createAsyncThunk(
  "payments/fetchYearlyPropertyPayments",
  async (
    { shortCode, year }: { shortCode: string; year: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { short_code: shortCode, year },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPropertyPayments
      .addCase(fetchPropertyPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showToast({
          message: "Failed to fetch property payments",
          type: "error",
        });
      })

      // fetchMonthlyPropertyPayments
      .addCase(fetchMonthlyPropertyPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyPropertyPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMonthlyPropertyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showToast({
          message: "Failed to fetch monthly payments",
          type: "error",
        });
      })

      // fetchYearlyPropertyPayments
      .addCase(fetchYearlyPropertyPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYearlyPropertyPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchYearlyPropertyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showToast({
          message: "Failed to fetch yearly payments",
          type: "error",
        });
      });
  },
});

export default paymentSlice.reducer;
