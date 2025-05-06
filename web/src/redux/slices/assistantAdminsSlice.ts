import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";

export interface IAssistantAdmin {
  id: number;
  name: string;
  email: string;
  role: "assistant_admin";
  manager_id: number;
  phone_number: string;

  // PROPERTIES
  can_view_properties: boolean;
  can_create_properties: boolean;
  can_update_properties: boolean;
  can_delete_properties: boolean;

  // HOUSES
  can_view_houses: boolean;
  can_create_houses: boolean;
  can_update_houses: boolean;
  can_delete_houses: boolean;

  // TENANTS & LEASES
  can_view_tenants: boolean;
  can_create_tenants: boolean;
  can_update_tenants: boolean;
  can_terminate_leases: boolean;

  // FINANCES
  can_view_payments: boolean;
  can_record_payments: boolean;
  can_withdraw_funds: boolean;

  // NOTIFICATIONS
  can_send_notifications: boolean;
  can_view_notification_history: boolean;
}

interface AssistantsState {
  list: IAssistantAdmin[];
  loading: boolean;
  error: string | null;
}

const initialState: AssistantsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAssistantAdmins = createAsyncThunk<
  IAssistantAdmin[],
  void,
  { rejectValue: string }
>("assistantAdmins/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/assistant_admins");
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const createAssistantAdmin = createAsyncThunk<
  IAssistantAdmin,
  { name: string; email: string; phone_number: string },
  { rejectValue: string }
>(
  "assistantAdmins/create",
  async ({ name, email, phone_number }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/assistant_admins", {
        assistant_admin: { name, email, phone_number },
      });
      dispatch(showToast({ message: "Assistant added", type: "success" }));
      return data;
    } catch (e: any) {
      dispatch(showToast({ message: e.message, type: "error" }));
      return rejectWithValue(e.message);
    }
  }
);

export const updateAssistantAdmin = createAsyncThunk<
  IAssistantAdmin, // <-- return type
  { id: number; changes: Partial<IAssistantAdmin> },
  { rejectValue: string }
>(
  "assistantAdmins/update",
  async ({ id, changes }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch<IAssistantAdmin>(
        `/assistant_admins/${id}`,
        changes
      );
      dispatch(showToast({ message: "Permissions updated", type: "success" }));
      return data; // <-- now returns the updated assistant
    } catch (e: any) {
      dispatch(showToast({ message: e.message, type: "error" }));
      return rejectWithValue(e.message);
    }
  }
);

export const deleteAssistantAdmin = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>("assistantAdmins/delete", async (id, { dispatch, rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/assistant_admins/${id}`);
    dispatch(showToast({ message: "Assistant removed", type: "success" }));
  } catch (e: any) {
    dispatch(showToast({ message: e.message, type: "error" }));
    return rejectWithValue(e.message);
  }
});

const slice = createSlice({
  name: "assistantAdmins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssistantAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssistantAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAssistantAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!;
      })
      .addCase(createAssistantAdmin.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateAssistantAdmin.fulfilled, (state, action) => {
        state.list = state.list.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(deleteAssistantAdmin.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a.id !== action.meta.arg);
      });
  },
});

export default slice.reducer;
