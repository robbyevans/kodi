import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";
import { fetchHistories } from "./tenantNotificationHistorySlice";

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  national_id: string;
  house_number: string;
  property_id: number;
  property_name: string;
}

interface State {
  tenants: Tenant[];
  loading: boolean;
  error: string | null;
}
const initialState: State = { tenants: [], loading: false, error: null };

export const fetchTenants = createAsyncThunk<
  Tenant[],
  void,
  { rejectValue: string }
>("notifications/fetchTenants", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/tenants");
    return data as Tenant[];
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const sendNotification = createAsyncThunk<
  void,
  { tenantIds: number[]; subject: string; body: string },
  { rejectValue: string }
>(
  "tenant_notifications/send",
  async ({ tenantIds, subject, body }, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post("/tenant_notifications", {
        subject,
        body,
        tenant_ids: tenantIds,
      });
      dispatch(
        showToast({
          type: "success",
          message: `Sent to ${tenantIds.length || "all"} tenant(s)`,
        })
      );
      // refresh history panel
      dispatch(fetchHistories());
    } catch (e: any) {
      dispatch(showToast({ type: "error", message: e.message }));
      return rejectWithValue(e.message);
    }
  }
);

const slice = createSlice({
  name: "tenant-notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tenants = payload;
      })
      .addCase(fetchTenants.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to load tenants";
      })
      .addCase(sendNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendNotification.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to send notification";
      }),
});

export default slice.reducer;
