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
} from "../selectors/adminSelectors";

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentAdmin);
  const loading = useAppSelector(selectAdminsLoading);
  const error = useAppSelector(selectAdminsError);
  const isAuthenticated = useAppSelector(selectIsAdminAuthenticated);

  const handleLogin = (email: string, password: string) => {
    dispatch(loginAdmin({ email, password }));
  };

  const handleSignup = (name: string, email: string, password: string) => {
    dispatch(signupAdmin({ name, email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // New handler to update admin details
  const handleEditUser = (data: { email?: string }) => {
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
    error,
    handleLogin,
    handleLogout,
    handleSignup,
    handleEditUser,
  };
};
