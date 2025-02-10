import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearToast } from "../slices/toastSlice";
import {
  selectToastMessage,
  selectToastType,
} from "../selectors/toastSelector";

export const useToast = () => {
  const dispatch = useAppDispatch();
  const toastMessage = useAppSelector(selectToastMessage);
  const messageType = useAppSelector(selectToastType);

  const clearToastMessage = useCallback(() => {
    dispatch(clearToast());
  }, [dispatch]);

  return { toastMessage, messageType, clearToastMessage };
};
