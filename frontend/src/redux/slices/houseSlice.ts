// File: /frontend/src/redux/slices/houseSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { ITenant } from "./tenantsSlice";

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

// Fetch houses for a given property
export const fetchHousesByProperty = createAsyncThunk(
  "houses/getHousesByProperty",
  async (propertyId: number) => {
    const response = await axiosInstance.get(
      `/properties/${propertyId}/houses`
    );
    return response.data;
  }
);

// Fetch a single house by its ID (non-nested URL)
export const fetchHouseById = createAsyncThunk(
  "houses/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/houses/${id}`);
    return response.data;
  }
);

// Add a new house to a property. Note that we now require propertyId.
export const addHouse = createAsyncThunk(
  "houses/add",
  async ({
    propertyId,
    houseData,
  }: {
    propertyId: number;
    houseData: Omit<IHouse, "id" | "property_id">;
  }) => {
    const response = await axiosInstance.post(
      `/properties/${propertyId}/houses`,
      { house: houseData }
    );
    return response.data;
  }
);

// Edit a house using its ID (non-nested URL)
export const editHouse = createAsyncThunk(
  "houses/edit",
  async ({ id, ...house }: IHouse) => {
    // Here we wrap the data in an object if your controller expects a root key
    const response = await axiosInstance.put(`/houses/${id}`, { house });
    return response.data;
  }
);

// Delete a house by its ID
export const deleteHouse = createAsyncThunk(
  "houses/delete",
  async (id: number) => {
    await axiosInstance.delete(`/houses/${id}`);
    return id;
  }
);

// Slice definition
const housesSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
