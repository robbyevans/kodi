import { RootState } from "../store";

export const selectHouses = (state: RootState) => state.houses.data;
export const selectHousesLoading = (state: RootState) => state.houses.loading;
export const selectHousesError = (state: RootState) => state.houses.error;
