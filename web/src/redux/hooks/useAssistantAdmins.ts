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
    add: (email: string) => dispatch(createAssistantAdmin({ email })),
    update: (id: number, changes: Partial<any>) =>
      dispatch(updateAssistantAdmin({ id, changes })),
    remove: (id: number) => dispatch(deleteAssistantAdmin(id)),
  };
};
