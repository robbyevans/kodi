// File: /frontend/src/redux/slices/tenantsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

export interface ITenant {
  id: number;
  name: string;
  email: string;
  phone_number: string;
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

// Thunks
export const fetchTenants = createAsyncThunk("tenants/fetchAll", async () => {
  const response = await axiosInstance.get("/tenants");
  return response.data;
});

export const fetchPropertyTenants = createAsyncThunk(
  "tenants/getPropertyTenants",
  async (propertyId: number) => {
    const response = await axiosInstance.get(
      `/tenants?property_id=${propertyId}`
    );
    return response.data;
  }
);

// Fetch tenants for a given house (nested route)
export const fetchTenantsByHouse = createAsyncThunk(
  "tenants/getByHouse",
  async (houseId: number) => {
    const response = await axiosInstance.get(`/houses/${houseId}/tenants`);
    return response.data;
  }
);

// Fetch a single tenant by ID (non-nested route)
export const fetchTenantById = createAsyncThunk(
  "tenants/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/tenants/${id}`);
    return response.data;
  }
);

// Add a tenant to a specific house (nested route)
export const addTenant = createAsyncThunk(
  "tenants/add",
  async ({
    houseId,
    tenantData,
  }: {
    houseId: number;
    tenantData: Omit<ITenant, "id">;
  }) => {
    const response = await axiosInstance.post(`/houses/${houseId}/tenants`, {
      tenant: tenantData,
    });
    return response.data;
  }
);

// Edit a tenant by ID (non-nested route)
export const editTenant = createAsyncThunk(
  "tenants/edit",
  async (tenantData: ITenant) => {
    const response = await axiosInstance.put(`/tenants/${tenantData.id}`, {
      tenantData,
    });
    return response.data;
  }
);

// Delete a tenant by ID
export const deleteTenant = createAsyncThunk(
  "tenants/delete",
  async (id: number) => {
    await axiosInstance.delete(`/tenants/${id}`);
    return id;
  }
);

// Slice definition
const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
