import { useAppDispatch, useAppSelector } from "../utils";
import {
  sendConfirmationCode,
  confirmEmail,
} from "../slices/emailConfirmationSlice";

export const useEmailConfirmation = () => {
  const dispatch = useAppDispatch();
  const { sent, confirmed, loading, error } = useAppSelector(
    (s) => s.emailConfirmation
  );
  return {
    sent,
    confirmed,
    loading,
    error,
    sendCode: () => dispatch(sendConfirmationCode()),
    confirm: (code: string) => dispatch(confirmEmail({ code })),
  };
};
