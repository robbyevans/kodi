import { useAppDispatch, useAppSelector } from "../utils";
import { signupAdmin, loginAdmin, logout } from "../slices/adminSlice";
import {
  selectCurrentAdmin,
  selectAdminsLoading,
  selectAdminsError,
  selectIsAdminAuthenticated,
  selectAdminRole,
} from "../selectors/adminSelectors";

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const currentAdmin = useAppSelector(selectCurrentAdmin);
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

  return {
    currentAdmin,
    isAuthenticated,
    loading,
    role,
    error,
    handleLogin,
    handleLogout,
    handleSignup,
  };
};
