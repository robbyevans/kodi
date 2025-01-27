import { RootState } from "../store";

export const selectIsAdminAuthenticated = (state: RootState) =>
  state.admins.isAuthenticated;
export const selectAdminsLoading = (state: RootState) => state.admins.loading;
export const selectAdminsError = (state: RootState) => state.admins.error;
export const selectCurrentAdmin = (state: RootState) =>
  state.admins.currentAdmin;
export const selectAdminRole = (state: RootState) => state.admins.role;
