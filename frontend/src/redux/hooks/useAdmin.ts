// File: /frontend/src/redux/hooks/useAdmin.ts
import { useAppDispatch, useAppSelector } from "../utils";
import {
  signupAdmin,
  loginAdmin,
  logout,
  editAdmin,
} from "../slices/adminSlice";
import {
  selectCurrentAdmin,
  selectAdminsLoading,
  selectAdminsError,
  selectIsAdminAuthenticated,
  selectAdminRole,
} from "../selectors/adminSelectors";

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentAdmin);
  const role = useAppSelector(selectAdminRole);
  const loading = useAppSelector(selectAdminsLoading);
  const error = useAppSelector(selectAdminsError);
  const isAuthenticated = useAppSelector(selectIsAdminAuthenticated);

  const handleLogin = (email: string, password: string) => {
    dispatch(loginAdmin({ email, password }));
  };

  const handleSignup = (email: string, password: string) => {
    dispatch(signupAdmin({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // New handler to update admin details
  const handleEditAdmin = (data: { email?: string }) => {
    if (!user.admin_id) {
      console.error("Admin ID is missing!");
      return;
    }
    dispatch(editAdmin({ adminId: user.admin_id, data }));
  };

  return {
    user,
    isAuthenticated,
    loading,
    role,
    error,
    handleLogin,
    handleLogout,
    handleSignup,
    handleEditAdmin,
  };
};
