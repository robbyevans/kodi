import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useTenantNotificationHistory } from "../../redux/hooks/useTenantNotificationHistory";
import * as S from "./styles";

const TenantNotificationHistory: React.FC = () => {
  const {
    histories,
    selected,
    loading,
    error,
    loadHistories,
    loadHistory,
    clear,
  } = useTenantNotificationHistory();

  useEffect(() => {
    loadHistories();
  }, []);

  return (
    <S.Container>
      <h2>Notification History</h2>
      {loading && <p>Loading…</p>}
      {error && <S.Error>{error}</S.Error>}

      <S.List>
        {histories.map((h) => (
          <S.Item key={h.id} onClick={() => loadHistory(h.id)}>
            <strong>{h.subject}</strong>
            <span>{dayjs(h.sent_at).format("MMM D, YYYY h:mm A")}</span>
          </S.Item>
        ))}
      </S.List>

      {selected && (
        <S.ModalOverlay onClick={clear}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.CloseButton onClick={clear}>×</S.CloseButton>
            <h3>{selected.subject}</h3>
            <em>
              Sent: {dayjs(selected.sent_at).format("MMM D, YYYY h:mm A")}
            </em>
            <p>{selected.body}</p>
            <h4>Recipients:</h4>
            <S.RecipientList>
              {selected.tenants.map((t) => (
                <li key={t.id}>
                  {t.house_number} – {t.name} ({t.email})
                </li>
              ))}
            </S.RecipientList>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default TenantNotificationHistory;
