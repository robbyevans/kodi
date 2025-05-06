import { FiMoreVertical, FiTrash2, FiEdit } from "react-icons/fi";
import type { IAssistantAdmin } from "../../redux/slices/assistantAdminsSlice";
import * as S from "./styles";

type Props = {
  list: IAssistantAdmin[];
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  newEmail: string;
  setNewEmail: React.Dispatch<React.SetStateAction<string>>;
  newPhone: string;
  setNewPhone: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleAdd: (e: React.FormEvent) => void;
  editing: number | null;
  setEditing: React.Dispatch<React.SetStateAction<number | null>>;
  update: (id: number, data: Partial<IAssistantAdmin>) => void;
  remove: (id: number) => void;
};

const flagGroups = {
  "Manage Properties": [
    "can_view_properties",
    "can_create_properties",
    "can_update_properties",
    "can_delete_properties",
  ],
  "Manage Houses": [
    "can_view_houses",
    "can_create_houses",
    "can_update_houses",
    "can_delete_houses",
  ],
  "Manage Tenants & Leases": [
    "can_view_tenants",
    "can_create_tenants",
    "can_update_tenants",
    "can_terminate_leases",
  ],
  "Manage Finances": [
    "can_view_payments",
    "can_record_payments",
    "can_withdraw_funds",
  ],
  "Manage Notifications": [
    "can_send_notifications",
    "can_view_notification_history",
  ],
} as const;

const AssistantAdmin: React.FC<Props> = ({
  list,
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  newPhone,
  setNewPhone,
  loading,
  handleAdd,
  editing,
  setEditing,
  update,
  remove,
}) => {
  return (
    <S.Container>
      <S.Header>Your Assistant Admins</S.Header>

      <S.AddForm onSubmit={handleAdd}>
        <S.TextInput
          placeholder="Full name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <S.TextInput
          type="email"
          placeholder="assistant@example.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <S.TextInput
          type="tel"
          placeholder="Phone number"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          required
        />
        <S.AddButton disabled={!newName || !newEmail || !newPhone || loading}>
          + Add
        </S.AddButton>
      </S.AddForm>

      <S.List>
        {(list ?? []).map((a) => (
          <S.ListItem key={a.id}>
            <S.ProfileSection>
              <S.ProfileImage src={a.profile_image} alt={a.name} />
              <div>
                <S.AdminName>{a.name}</S.AdminName>
                <S.AdminEmail>{a.email}</S.AdminEmail>
              </div>
            </S.ProfileSection>
            <S.MoreIconButton onClick={() => setEditing(a.id)}>
              <FiMoreVertical />
            </S.MoreIconButton>
          </S.ListItem>
        ))}
      </S.List>

      {editing !== null &&
        list &&
        (() => {
          const asst = list.find((x) => x.id === editing);
          if (!asst) return null; // Guard against undefined

          return (
            <S.ModalBackdrop onClick={() => setEditing(null)}>
              <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalHeader>
                  <h2>{asst.name}</h2>
                  <p>
                    {asst.email} · {asst.phone_number}
                  </p>
                </S.ModalHeader>
                <S.Flags>
                  {Object.entries(flagGroups).map(([title, flags]) => (
                    <S.FlagGroup key={title}>
                      <S.GroupTitle>{title}</S.GroupTitle>
                      {flags.map((flag) => (
                        <S.ToggleWrapper key={flag}>
                          {flag.replace(/_/g, " ")}
                          <S.ToggleInput
                            type="checkbox"
                            id={`${asst.id}-${flag}`}
                            checked={asst[flag]}
                            onChange={(e) =>
                              update(asst.id, { [flag]: e.target.checked })
                            }
                          />
                          <S.ToggleSlider checked={asst[flag]} />
                        </S.ToggleWrapper>
                      ))}
                    </S.FlagGroup>
                  ))}
                </S.Flags>

                <S.ModalActions>
                  <S.EditButton>
                    <FiEdit /> Edit
                  </S.EditButton>
                  <S.DeleteButton
                    onClick={() => {
                      remove(asst.id);
                      setEditing(null);
                    }}
                  >
                    <FiTrash2 /> Delete
                  </S.DeleteButton>
                </S.ModalActions>

                <S.CloseButton onClick={() => setEditing(null)}>
                  Done
                </S.CloseButton>
              </S.ModalContent>
            </S.ModalBackdrop>
          );
        })()}
    </S.Container>
  );
};

export default AssistantAdmin;
