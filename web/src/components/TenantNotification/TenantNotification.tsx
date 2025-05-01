import React, { useEffect, useState } from "react";
import { useNotifications } from "../../redux/hooks/useTenantNotification";
import * as S from "./styles";

const TenantNotificationsPage: React.FC = () => {
  const { tenants, loading, loadTenants, send, error } = useNotifications();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [all, setAll] = useState(false);

  useEffect(() => {
    loadTenants();
  }, []);

  const toggleTenant = (id: number) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(all ? [] : selected, subject, body);
  };

  return (
    <S.Container>
      <h1>Send Notification</h1>
      <form onSubmit={onSubmit}>
        <S.RadioGroup>
          <label>
            <input type="radio" checked={all} onChange={() => setAll(true)} />{" "}
            All tenants
          </label>
          <label>
            <input type="radio" checked={!all} onChange={() => setAll(false)} />{" "}
            Selected tenants
          </label>
        </S.RadioGroup>

        {!all && (
          <S.MultiSelect>
            {loading ? (
              <p>Loading…</p>
            ) : (
              tenants.map((t) => (
                <label key={t.id}>
                  <input
                    type="checkbox"
                    checked={selected.includes(t.id)}
                    onChange={() => toggleTenant(t.id)}
                  />{" "}
                  {t.name} ({t.email})
                </label>
              ))
            )}
          </S.MultiSelect>
        )}

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Message body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        {error && <S.Error>{error}</S.Error>}
        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send"}
        </button>
      </form>
    </S.Container>
  );
};

export default TenantNotificationsPage;
