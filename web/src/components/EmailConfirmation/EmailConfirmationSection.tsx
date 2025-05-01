import React, { useState } from "react";
import { useEmailConfirmation } from "../../redux/hooks/useEmailConfirmation";
import * as S from "./styles";

const EmailConfirmationSection: React.FC = () => {
  const { sent, confirmed, loading, error, sendCode, confirm } =
    useEmailConfirmation();
  const [code, setCode] = useState("");
  return (
    <S.Section>
      <h2>Email Confirmation</h2>
      {confirmed ? (
        <p>Your email is confirmed ✅</p>
      ) : (
        <>
          <button onClick={sendCode} disabled={loading || sent}>
            {sent ? "Code Sent" : "Send Confirmation Code"}
          </button>
          <S.Input
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={!sent}
          />
          <button onClick={() => confirm(code)} disabled={loading || !sent}>
            Confirm Email
          </button>
          {error && <S.Error>{error}</S.Error>}
        </>
      )}
    </S.Section>
  );
};

export default EmailConfirmationSection;
