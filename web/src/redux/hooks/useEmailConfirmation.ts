import { useAppDispatch, useAppSelector } from "../utils";
import {
  sendConfirmationCode,
  confirmEmail,
} from "../slices/emailConfirmationSlice";

export const useEmailConfirmation = () => {
  const dispatch = useAppDispatch();
  const { sent, loading, error } = useAppSelector((s) => s.emailConfirmation);
  return {
    sent,
    loading,
    error,
    sendCode: () => dispatch(sendConfirmationCode()),
    confirm: (code: string) => dispatch(confirmEmail({ code })),
  };
};
