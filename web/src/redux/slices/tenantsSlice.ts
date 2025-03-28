import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { fetchAllProperties } from "./propertiesSlice";
import { showToast } from "./toastSlice";

export interface ITenant {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  national_id: string;
  status?: string | null;
}

interface TenantsState {
  data: ITenant[];
  loading: boolean;
  error: string | null;
}

const initialState: TenantsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAllTenants = createAsyncThunk(
  "tenants/fetchAll",
  async () => {
    const response = await axiosInstance.get("/tenants");
    return response.data;
  }
);

export const fetchPropertyTenants = createAsyncThunk(
  "tenants/getPropertyTenants",
  async (propertyId: number) => {
    const response = await axiosInstance.get(
      `/tenants?property_id=${propertyId}`
    );
    return response.data;
  }
);

export const fetchTenantsByHouse = createAsyncThunk(
  "tenants/getByHouse",
  async (houseId: number) => {
    const response = await axiosInstance.get(`/houses/${houseId}/tenants`);
    return response.data;
  }
);

export const fetchTenantById = createAsyncThunk(
  "tenants/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/tenants/${id}`);
    return response.data;
  }
);

export const addTenant = createAsyncThunk(
  "tenants/add",
  async (
    {
      houseId,
      tenantData,
    }: { houseId: number; tenantData: Omit<ITenant, "id"> },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/houses/${houseId}/tenants`, {
        tenant: tenantData,
      });

      dispatch(fetchAllProperties());
      dispatch(
        showToast({ message: "Tenant added successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      dispatch(showToast({ message: "Failed to add Tenant", type: "error" }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editTenant = createAsyncThunk(
  "tenants/edit",
  async (
    { houseId, tenantData }: { houseId: number; tenantData: ITenant },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/houses/${houseId}/tenants/${tenantData.id}`,
        { tenant: tenantData }
      );
      dispatch(fetchAllProperties());
      dispatch(
        showToast({ message: "Tenant updated successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showToast({ message: "Failed to update Tenant", type: "error" })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTenant = createAsyncThunk(
  "tenants/delete",
  async (
    { houseId, tenantId }: { houseId: number; tenantId: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await axiosInstance.delete(`/houses/${houseId}/tenants/${tenantId}`);
      dispatch(fetchAllProperties());
      dispatch(
        showToast({ message: "Tenant deleted successfully!", type: "success" })
      );
      return tenantId;
    } catch (error: any) {
      dispatch(
        showToast({ message: "Failed to delete Tenant", type: "error" })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Slice definition
const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllTenants cases
      .addCase(fetchAllTenants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tenants";
      })

      // Update state with fetched tenant by ID
      .addCase(fetchTenantById.fulfilled, (state, action) => {
        state.data = state.data.map((tenant) =>
          tenant.id === action.payload.id ? action.payload : tenant
        );
      })
      .addCase(addTenant.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editTenant.fulfilled, (state, action) => {
        state.data = state.data.map((tenant) =>
          tenant.id === action.payload.id ? action.payload : tenant
        );
      })
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (tenant) => tenant.id !== action.payload
        );
      })
      .addCase(fetchTenantsByHouse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTenantsByHouse.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTenantsByHouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tenants";
      });
  },
});

export default tenantsSlice.reducer;
