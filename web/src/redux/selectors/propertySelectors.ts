import { RootState } from "../store";

export const selectProperties = (state: RootState) => state.properties.data;
export const selectPropertiesLoading = (state: RootState) =>
  state.properties.loading;
export const selectPropertiesError = (state: RootState) =>
  state.properties.error;
