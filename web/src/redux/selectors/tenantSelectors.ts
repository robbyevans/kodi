import { RootState } from "../store";

export const selectAllTenants = (state: RootState) => state.tenants.data;
export const selectTenantsLoading = (state: RootState) => state.tenants.loading;
export const selectTenantsError = (state: RootState) => state.tenants.error;
