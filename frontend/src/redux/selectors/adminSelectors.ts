import { RootState } from "../store";

export const selectIsAdminAuthenticated = (state: RootState) =>
  state.admins.token;
export const selectAdminsLoading = (state: RootState) => state.admins.loading;
export const selectAdminsError = (state: RootState) => state.admins.error;
export const selectCurrentAdmin = (state: RootState) => state.admins.admin;
export const selectAdminRole = (state: RootState) => state.admins.admin?.role;
