// File: /frontend/src/redux/selectors/toastSelectors.ts
import { RootState } from "../store";

export const selectToastMessage = (state: RootState) => state.toast.message;
export const selectToastType = (state: RootState) => state.toast.type;
