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
  property_id: string;
  house_number: string;
  settled: boolean;
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

// Fetch payments by property id
export const fetchPaymentsByProperty = createAsyncThunk(
  "payments/fetchPaymentsByProperty",
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { property_id: propertyId },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch monthly payments for a property (filter by property_id, month, and year)
export const fetchMonthlyPropertyPayments = createAsyncThunk(
  "payments/fetchMonthlyPropertyPayments",
  async (
    {
      propertyId,
      month,
      year,
    }: { propertyId: string; month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { property_id: propertyId, month, year },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch yearly payments for a property (filter by property_id and year)
export const fetchYearlyPropertyPayments = createAsyncThunk(
  "payments/fetchYearlyPropertyPayments",
  async (
    { propertyId, year }: { propertyId: string; year: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { property_id: propertyId, year },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// New thunk: Fetch all payments (for system admin) filtered by year and optionally month
export const fetchAllPaymentData = createAsyncThunk(
  "payments/fetchAllPaymentData",
  async (
    { month, year }: { month?: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const params: any = { year };
      if (month !== undefined) {
        params.month = month;
      }
      const response = await axiosInstance.get("/payments", { params });
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
    // fetchPaymentsByProperty
    builder.addCase(fetchPaymentsByProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPaymentsByProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPaymentsByProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({
        message: "Failed to fetch payments by property",
        type: "error",
      });
    });

    // fetchMonthlyPropertyPayments
    builder.addCase(fetchMonthlyPropertyPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMonthlyPropertyPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMonthlyPropertyPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({
        message: "Failed to fetch monthly payments",
        type: "error",
      });
    });

    // fetchYearlyPropertyPayments
    builder.addCase(fetchYearlyPropertyPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchYearlyPropertyPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchYearlyPropertyPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({
        message: "Failed to fetch yearly payments",
        type: "error",
      });
    });

    // fetchAllPaymentData
    builder.addCase(fetchAllPaymentData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPaymentData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllPaymentData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({
        message: "Failed to fetch all payments",
        type: "error",
      });
    });
  },
});

export default paymentSlice.reducer;
