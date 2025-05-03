import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchAssistantAdmins,
  createAssistantAdmin,
  updateAssistantAdmin,
  deleteAssistantAdmin,
} from "../slices/assistantAdminsSlice";

export const useAssistantAdmins = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(
    (state) => state.assistantAdmin
  );

  return {
    list,
    loading,
    error,
    load: () => dispatch(fetchAssistantAdmins()),
    add: (name: string, email: string, phone_number: string) =>
      dispatch(createAssistantAdmin({ name, email, phone_number })),
    update: (id: number, changes: any) =>
      dispatch(updateAssistantAdmin({ id, changes })),
    remove: (id: number) => dispatch(deleteAssistantAdmin(id)),
  };
};
