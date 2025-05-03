import React, { useEffect, useState } from "react";
import { useTenantNotifications } from "../../redux/hooks/useTenantNotification";
import TenantNotificationHistory from "../TenantNotificationHistory/TenantNotificationHistory";
import * as S from "./styles";

const TenantNotificationsPage: React.FC = () => {
  const { tenants, loading, loadTenants, send, error } =
    useTenantNotifications();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [all, setAll] = useState(false);
  const [filterProp, setFilterProp] = useState<number | "all">("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    loadTenants();
  }, []);

  const properties = Array.from(
    new Map(tenants.map((t) => [t.property_id, t.property_name])).entries()
  ).map(([id, name]) => ({ id, name }));

  const visible =
    filterProp === "all"
      ? tenants
      : tenants.filter((t) => t.property_id === filterProp);

  const toggleTenant = (id: number) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );

  const toggleAllInProp = () => {
    const ids = visible.map((t) => t.id);
    const allSel =
      ids.length > 0 && ids.every((id) => selectedIds.includes(id));
    setSelectedIds(allSel ? [] : ids);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(all ? [] : selectedIds, subject, body);
  };

  return (
    <S.Container>
      <h1>Send Notification</h1>
      <form onSubmit={onSubmit}>
        <S.RadioGroup>
          <label>
            <input type="radio" checked={all} onChange={() => setAll(true)} />{" "}
            All
          </label>
          <label>
            <input
              type="radio"
              checked={!all}
              onChange={() => {
                setAll(false);
                setFilterProp("all");
                setSelectedIds([]);
              }}
            />{" "}
            Selected
          </label>
        </S.RadioGroup>

        {!all && (
          <>
            <S.Field>
              <label>Property</label>
              <select
                value={filterProp}
                onChange={(e) => {
                  const v = e.target.value;
                  setFilterProp(v === "all" ? "all" : +v);
                  setSelectedIds([]);
                }}
              >
                <option value="all">Select Property</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </S.Field>

            {filterProp !== "all" && (
              <S.MultiSelect>
                <label>
                  <input
                    type="checkbox"
                    onChange={toggleAllInProp}
                    checked={
                      visible.length > 0 &&
                      visible.every((t) => selectedIds.includes(t.id))
                    }
                  />{" "}
                  Select all in{" "}
                  {properties.find((p) => p.id === filterProp)?.name}
                </label>
                {visible.map((t) => (
                  <label key={t.id}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(t.id)}
                      onChange={() => toggleTenant(t.id)}
                    />{" "}
                    {t.house_number} – {t.name}
                  </label>
                ))}
              </S.MultiSelect>
            )}
          </>
        )}

        <S.Field>
          <label>Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </S.Field>
        <S.Field>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </S.Field>

        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send"}
        </button>
        {error && <S.Error>{error}</S.Error>}
      </form>

      <TenantNotificationHistory />
    </S.Container>
  );
};

export default TenantNotificationsPage;
