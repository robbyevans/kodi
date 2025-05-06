import React, { useEffect, useState } from "react";
import { useAssistantAdmins } from "../../redux/hooks/useAssistantAdmins";
import * as S from "./styles";

const AssistantAdmins: React.FC = () => {
  const { list, load, add, update, remove, loading } = useAssistantAdmins();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await add(newName, newEmail, newPhone).unwrap();
      setNewName("");
      setNewEmail("");
      setNewPhone("");
    } catch {
      /* toast will show errors */
    }
  };

  const flags = [
    // PROPERTIES
    "can_view_properties",
    "can_create_properties",
    "can_update_properties",
    "can_delete_properties",

    // HOUSES
    "can_view_houses",
    "can_create_houses",
    "can_update_houses",
    "can_delete_houses",

    // TENANTS & LEASES
    "can_view_tenants",
    "can_create_tenants",
    "can_update_tenants",
    "can_terminate_leases",

    // FINANCES
    "can_view_payments",
    "can_record_payments",
    "can_withdraw_funds",

    // NOTIFICATIONS
    "can_send_notifications",
    "can_view_notification_history",
  ] as const;

  return (
    <S.Container>
      <S.Header>Your Assistant Admins</S.Header>

      <S.AddForm onSubmit={handleAdd}>
        <S.TextInput
          type="text"
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
        <S.AddButton
          type="submit"
          disabled={!newName || !newEmail || !newPhone || loading}
        >
          + Add
        </S.AddButton>
      </S.AddForm>

      <S.List>
        {list.map((a) => (
          <S.ListItem key={a.id}>
            <span>
              {a.name} — {a.email}
            </span>
            <S.ActionGroup>
              <S.IconButton onClick={() => remove(a.id)}>🗑️</S.IconButton>
              <S.IconButton onClick={() => setEditing(a.id)}>⚙️</S.IconButton>
            </S.ActionGroup>
          </S.ListItem>
        ))}
      </S.List>

      {editing !== null &&
        (() => {
          const asst = list.find((x) => x.id === editing)!;
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
                </S.Flags>
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

export default AssistantAdmins;
