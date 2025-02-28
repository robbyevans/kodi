import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { IHouse } from "./houseSlice";
import { showToast } from "./toastSlice";

// In propertiesSlice.ts:
export interface IProperty {
  id?: number;
  admin_id: number;
  name: string;
  mpesa_paybill_number?: string;
  location?: string;
  address?: string;
  property_image?: File | string;
  houses?: IHouse[] | null;
}

interface PropertiesState {
  data: IProperty[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesState = {
  data: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchAllProperties = createAsyncThunk(
  "properties/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/properties");
      // Optionally, you can dispatch a success toast here.
      return response.data;
    } catch (error: any) {
      dispatch(
        showToast({ message: "Failed to fetch properties", type: "error" })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  "properties/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/properties/${id}`);
    return response.data;
  }
);

export const addProperty = createAsyncThunk(
  "properties/add",
  async (property: IProperty, { dispatch, rejectWithValue }) => {
    try {
      let payload: FormData | object;
      const headers: Record<string, string> = {};

      if (property.property_image && property.property_image instanceof File) {
        const formData = new FormData();
        formData.append("property[name]", property.name);
        formData.append("property[admin_id]", property.admin_id.toString());
        // New optional fields:
        if (property.mpesa_paybill_number) {
          formData.append(
            "property[mpesa_paybill_number]",
            property.mpesa_paybill_number
          );
        }
        if (property.location) {
          formData.append("property[location]", property.location);
        }
        if (property.address) {
          formData.append("property[address]", property.address);
        }
        formData.append("property[property_image]", property.property_image);
        payload = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = {
          property: {
            name: property.name,
            admin_id: property.admin_id,
            mpesa_paybill_number: property.mpesa_paybill_number,
            location: property.location,
            address: property.address,
          },
        };
      }

      const response = await axiosInstance.post("/properties", payload, {
        headers,
      });
      dispatch(
        showToast({ message: "Property added successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showToast({ message: "Failed to add new property", type: "error" })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editProperty = createAsyncThunk(
  "properties/edit",
  async (property: IProperty, { dispatch, rejectWithValue }) => {
    try {
      let payload: FormData | object;
      const headers: Record<string, string> = {};

      if (property.property_image && property.property_image instanceof File) {
        // When updating with a new file, use FormData.
        const formData = new FormData();
        formData.append("property[name]", property.name);
        formData.append("property[admin_id]", property.admin_id.toString());
        // Include new optional fields:
        if (property.mpesa_paybill_number) {
          formData.append(
            "property[mpesa_paybill_number]",
            property.mpesa_paybill_number
          );
        }
        if (property.location) {
          formData.append("property[location]", property.location);
        }
        if (property.address) {
          formData.append("property[address]", property.address);
        }
        formData.append("property[property_image]", property.property_image);
        if (property.id) {
          formData.append("property[id]", property.id.toString());
        }
        payload = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        // When editing only non-file fields.
        const payloadData: Partial<IProperty> = {
          name: property.name,
          admin_id: property.admin_id,
          mpesa_paybill_number: property.mpesa_paybill_number,
          location: property.location,
          address: property.address,
        };
        if (property.id) {
          payloadData.id = property.id;
        }
        payload = { property: payloadData };
      }

      const response = await axiosInstance.put(
        `/properties/${property.id}`,
        payload,
        { headers }
      );
      dispatch(
        showToast({
          message: "Property updated successfully!",
          type: "success",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showToast({ message: "Failed to update property", type: "error" })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/properties/${id}`);
      dispatch(
        showToast({
          message: "Property deleted successfully!",
          type: "success",
        })
      );
      return id;
    } catch (error: any) {
      dispatch(
        showToast({ message: "Failed to fetch properties", type: "error" })
      ); // Show error toast
      return rejectWithValue(error.response?.data);
    }
  }
);

// Slice
const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch properties";
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        const updatedProperty = action.payload;
        const existingIndex = state.data.findIndex(
          (property) => property.id === updatedProperty.id
        );
        if (existingIndex >= 0) {
          state.data[existingIndex] = updatedProperty; // Update if exists
        } else {
          state.data.push(updatedProperty); // Add new property if it doesn't exist
        }
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.data = state.data.map((property) =>
          property.id === action.payload.id ? action.payload : property
        );
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (property) => property.id !== action.payload
        );
      });
  },
});

export default propertiesSlice.reducer;
