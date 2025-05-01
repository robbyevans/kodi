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

  return {
    step,
    loading,
    error,
    sendCode: (email: string) =>
      dispatch(sendResetCode({ email })).then(() => dispatch(toVerify())),
    verifyCode: (email: string, code: string) =>
      dispatch(verifyResetCode({ email, code })).then(() =>
        dispatch(toReset())
      ),
    reset: (email: string, code: string, pw: string, pw2: string) =>
      dispatch(
        resetPassword({ email, code, password: pw, password_confirmation: pw2 })
      ),
  };
};
