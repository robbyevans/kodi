import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils";
import { showToast } from "./toastSlice";

interface TenantNotificationsState {
  tenants: { id: number; name: string; email: string }[];
  loading: boolean;
  error: string | null;
}
const initialState: TenantNotificationsState = {
  tenants: [],
  loading: false,
  error: null,
};

export const fetchTenants = createAsyncThunk(
  "notifications/fetchTenants",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/tenants");
      return data as TenantNotificationsState["tenants"];
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const sendNotification = createAsyncThunk<
  void,
  { tenantIds: number[]; subject: string; body: string }
>(
  "notifications/send",
  async ({ tenantIds, subject, body }, { dispatch, rejectWithValue }) => {
    try {
      if (tenantIds.length === 0) {
        // all tenants
        await axios.post("/notifications/tenants", { subject, body });
      } else {
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
  extraReducers: (b) =>
    b
      .addCase(fetchTenants.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchTenants.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.tenants = payload;
      })
      .addCase(fetchTenants.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      })
      .addCase(sendNotification.pending, (s) => {
        s.loading = true;
      })
      .addCase(sendNotification.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(sendNotification.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      }),
});
export default slice.reducer;
