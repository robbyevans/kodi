// File: /frontend/src/redux/slices/houseSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { ITenant } from "./tenantsSlice";
import { showToast } from "./toastSlice"; // Import showToast action
import { fetchAllProperties } from "./propertiesSlice";

export interface IHouse {
  id: number;
  house_number: string;
  payable_rent: number;
  tenant: ITenant | null;
  property_id: number;
}

interface HousesState {
  data: IHouse[];
  loading: boolean;
  error: string | null;
}

const initialState: HousesState = {
  data: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchAllHouses = createAsyncThunk("houses/fetchAll", async () => {
  const response = await axiosInstance.get("/houses");
  return response.data;
});

export const fetchHousesByProperty = createAsyncThunk(
  "houses/getHousesByProperty",
  async (propertyId: number) => {
    const response = await axiosInstance.get(
      `/properties/${propertyId}/houses`
    );
    return response.data;
  }
);

export const fetchHouseById = createAsyncThunk(
  "houses/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/houses/${id}`);
    return response.data;
  }
);

export const addHouse = createAsyncThunk(
  "houses/add",
  async (
    {
      propertyId,
      houseData,
    }: {
      propertyId: number;
      houseData: Omit<IHouse, "id" | "property_id">;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/properties/${propertyId}/houses`,
        { house: houseData }
      );
      dispatch(fetchAllProperties());
      dispatch(
        showToast({ message: "House added successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showToast({ message: "Failed to add new House", type: "error" })
      ); // Show error toast
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editHouse = createAsyncThunk(
  "houses/edit",
  async ({ id, ...house }: IHouse, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/houses/${id}`, { house });
      dispatch(fetchAllProperties());
      dispatch(
        showToast({ message: "House updated successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      dispatch(showToast({ message: "Failed to update House", type: "error" })); // Show error toast
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteHouse = createAsyncThunk(
  "houses/delete",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/houses/${id}`);
      dispatch(fetchAllProperties());
      dispatch(
        showToast({ message: "House deleted successfully!", type: "success" })
      );
      return id;
    } catch (error: any) {
      dispatch(showToast({ message: "Failed to delete House", type: "error" })); // Show error toast
      return rejectWithValue(error.response?.data);
    }
  }
);

// Slice definition
const housesSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHouses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch houses";
      })
      .addCase(fetchHouseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHouseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((house) =>
          house.id === action.payload.id ? action.payload : house
        );
      })
      .addCase(fetchHouseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch house";
      })
      .addCase(addHouse.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editHouse.fulfilled, (state, action) => {
        state.data = state.data.map((house) =>
          house.id === action.payload.id ? action.payload : house
        );
      })
      .addCase(deleteHouse.fulfilled, (state, action) => {
        state.data = state.data.filter((house) => house.id !== action.payload);
      })
      .addCase(fetchHousesByProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHousesByProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHousesByProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch houses";
      });
  },
});

export default housesSlice.reducer;
