import React, { useEffect, useState } from "react";
import { useAssistantAdmins } from "../redux/hooks/useAssistantAdmins";
import AssistantAdmin from "../components/AssistantsAdmins/AssistantAdmins";

const AssistantAdminContainer: React.FC = () => {
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
      // handled by toast
    }
  };

  return (
    <AssistantAdmin
      list={list}
      newName={newName}
      setNewName={setNewName}
      newEmail={newEmail}
      setNewEmail={setNewEmail}
      newPhone={newPhone}
      setNewPhone={setNewPhone}
      loading={loading}
      handleAdd={handleAdd}
      editing={editing}
      setEditing={setEditing}
      update={update}
      remove={remove}
    />
  );
};

export default AssistantAdminContainer;
