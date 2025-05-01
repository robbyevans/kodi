// File: src/redux/hooks/useAdmins.ts
import { useAppDispatch, useAppSelector } from "../utils";
import {
  signupAdmin,
  loginAdmin,
  logout,
  editAdmin,
  googleAuthAdmin,
} from "../slices/adminSlice";
import {
  selectCurrentAdmin,
  selectAdminsLoading,
  selectAdminsError,
  selectIsAdminAuthenticated,
  selectIsAdminEmailVerified,
} from "../selectors/adminSelectors";

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentAdmin);
  const loading = useAppSelector(selectAdminsLoading);
  const error = useAppSelector(selectAdminsError);
  const isAuthenticated = useAppSelector(selectIsAdminAuthenticated);
  const isUserEmailVerified = useAppSelector(selectIsAdminEmailVerified);

  const handleLogin = (email: string, password: string) =>
    dispatch(loginAdmin({ email, password }));

  const handleSignup = (
    name: string,
    email: string,
    password: string,
    phone_number: string
  ) =>
    dispatch(
      signupAdmin({ name, email, password, phone_number })
    );

  const handleLogout = () => dispatch(logout());

  const handleEditUser = (data: FormData | Partial<ReturnType<typeof selectCurrentAdmin>>) => {
    if (!user.admin_id) return console.error("Missing admin_id");
    dispatch(editAdmin({ adminId: user.admin_id, data }));
  };

  const handleGoogleAuth = (token: string, mode: "login" | "signup") =>
    dispatch(googleAuthAdmin({ token, mode }));

  return {
    user,
    isAuthenticated,
    isUserEmailVerified,
    loading,
    error,
    handleLogin,
    handleSignup,
    handleLogout,
    handleEditUser,
    handleGoogleAuth,
  };
};
