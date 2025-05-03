import React, { useEffect, useState } from "react";

import { useTenantNotifications } from "../../redux/hooks/useTenantNotification";
import TenantNotificationHistory from "../TenantNotificationHistory/TenantNotificationHistory";
import * as S from "./styles";

const TenantNotificationsPage: React.FC = () => {
  const { tenants, loading, loadTenants, send, error } =
    useTenantNotifications();

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [allTenants, setAllTenants] = useState(false);

  // for “selected” mode:
  const [selectedProperty, setSelectedProperty] = useState<number | "all">(
    "all"
  );
  const [selectedTenantIds, setSelectedTenantIds] = useState<number[]>([]);

  useEffect(() => {
    loadTenants();
  }, []);

  // build unique property list
  const properties = Array.from(
    new Map(tenants.map((t) => [t.property_id, t.property_name])).entries()
  ).map(([id, name]) => ({ id, name }));

  // tenants filtered by selectedProperty
  const visibleTenants =
    selectedProperty === "all"
      ? tenants
      : tenants.filter((t) => t.property_id === selectedProperty);

  const toggleTenant = (id: number) => {
    setSelectedTenantIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAllInProperty = () => {
    const ids = visibleTenants.map((t) => t.id);
    const allSelected =
      ids.every((id) => selectedTenantIds.includes(id)) && ids.length > 0;
    setSelectedTenantIds(allSelected ? [] : ids);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if allTenants, send [] -> treated as broadcast
    send(allTenants ? [] : selectedTenantIds, subject, body);
  };

  return (
    <S.Container>
      <h1>Send Notification</h1>
      <form onSubmit={onSubmit}>
        <S.RadioGroup>
          <label>
            <input
              type="radio"
              checked={allTenants}
              onChange={() => setAllTenants(true)}
            />{" "}
            All tenants
          </label>
          <label>
            <input
              type="radio"
              checked={!allTenants}
              onChange={() => {
                setAllTenants(false);
                setSelectedProperty("all");
                setSelectedTenantIds([]);
              }}
            />{" "}
            Selected tenants
          </label>
        </S.RadioGroup>

        {!allTenants && (
          <>
            <S.Field>
              <label>Property</label>
              <select
                value={selectedProperty}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedProperty(v === "all" ? "all" : +v);
                  setSelectedTenantIds([]);
                }}
              >
                <option value="all">— Choose property —</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </S.Field>

            {selectedProperty !== "all" && (
              <S.MultiSelect>
                <label>
                  <input
                    type="checkbox"
                    onChange={toggleAllInProperty}
                    checked={
                      visibleTenants.length > 0 &&
                      visibleTenants.every((t) =>
                        selectedTenantIds.includes(t.id)
                      )
                    }
                  />{" "}
                  Select all tenants in{" "}
                  {properties.find((p) => p.id === selectedProperty)?.name}
                </label>

                {loading ? (
                  <p>Loading tenants…</p>
                ) : visibleTenants.length === 0 ? (
                  <p>No tenants in this property.</p>
                ) : (
                  visibleTenants.map((t) => (
                    <label key={t.id}>
                      <input
                        type="checkbox"
                        checked={selectedTenantIds.includes(t.id)}
                        onChange={() => toggleTenant(t.id)}
                      />{" "}
                      {t.house_number} – {t.name}
                    </label>
                  ))
                )}
              </S.MultiSelect>
            )}
          </>
        )}

        <S.Field>
          <label>Subject</label>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </S.Field>

        <S.Field>
          <label>Message</label>
          <textarea
            placeholder="Your message…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </S.Field>

        {error && <S.Error>{error}</S.Error>}

        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send"}
        </button>
      </form>
      <TenantNotificationHistory />
    </S.Container>
  );
};

export default TenantNotificationsPage;
