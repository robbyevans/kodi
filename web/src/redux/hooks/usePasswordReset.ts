// web/src/redux/hooks/usePasswordReset.ts
import { useAppDispatch, useAppSelector } from "../utils";
import {
  sendResetCode,
  verifyResetCode,
  resetPassword,
  toVerify,
  toReset,
} from "../slices/passwordResetSlice";

export const usePasswordReset = () => {
  const dispatch = useAppDispatch();
  const { step, loading, error } = useAppSelector((s) => s.passwordReset);

  const sendCode = async (email: string) => {
    try {
      await dispatch(sendResetCode({ email })).unwrap();
      dispatch(toVerify());
    } catch {
      /* error is shown by slice */
    }
  };

  const verifyCode = async (email: string, code: string) => {
    try {
      await dispatch(verifyResetCode({ email, code })).unwrap();
      dispatch(toReset());
    } catch {
      /* error is shown */
    }
  };

  const reset = async (
    email: string,
    code: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      await dispatch(
        resetPassword({ email, code, password, password_confirmation })
      ).unwrap();
      // on success, auto-login & redirect:
      await dispatch(
        // assume you export loginAdmin from your admin slice
        (
          await import("../slices/adminSlice")
        ).loginAdmin({
          email,
          password,
        })
      ).unwrap();
      window.location.href = "/dashboard"; // or use your router
    } catch {
      /* show error */
    }
  };

  return { step, loading, error, sendCode, verifyCode, reset };
};
