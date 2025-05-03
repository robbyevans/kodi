import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils";
import { showToast } from "./toastSlice";

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

interface TenantNotificationsState {
  tenants: Tenant[];
  loading: boolean;
  error: string | null;
}

const initialState: TenantNotificationsState = {
  tenants: [],
  loading: false,
  error: null,
};

export const fetchTenants = createAsyncThunk<
  Tenant[],
  void,
  { rejectValue: string }
>("notifications/fetchTenants", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/tenants");
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
  "notifications/send",
  async ({ tenantIds, subject, body }, { dispatch, rejectWithValue }) => {
    try {
      if (tenantIds.length === 0) {
        // broadcast to all
        await axios.post("/notifications/tenants", { subject, body });
      } else {
        // send to each individually
        await Promise.all(
          tenantIds.map((id) =>
            axios.post(`/notifications/tenant/${id}`, { subject, body })
          )
        );
      }
      dispatch(showToast({ message: "Notifications sent!", type: "success" }));
    } catch (e: any) {
      dispatch(showToast({ message: e.message, type: "error" }));
      return rejectWithValue(e.message);
    }
  }
);

const slice = createSlice({
  name: "notifications",
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
