import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantNotificationsPage from "../TenantNotification/TenantNotification";
import EmailConfirmationSection from "../EmailConfirmation/EmailConfirmationSection";
import * as S from "./styles";

const More: React.FC = () => {
  const [section, setSection] = useState<"notifications" | "email" | null>(
    null
  );
  const [exiting, setExiting] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (section) {
      setExiting(true);
    } else {
      navigate(-1);
    }
  };

  const onAnimationEnd = () => {
    if (exiting) {
      setExiting(false);
      setSection(null);
    }
  };

  return (
    <S.PageWrapper>
      {section === null ? (
        <S.MenuHeader></S.MenuHeader>
      ) : (
        <S.SectionHeader>
          <S.BackButton onClick={handleBack}>← Back</S.BackButton>
        </S.SectionHeader>
      )}

      {section === null && (
        <S.MenuList>
          <S.MenuItem onClick={() => setSection("notifications")}>
            Notifications
          </S.MenuItem>
          <S.MenuItem onClick={() => setSection("email")}>
            Email Confirmation
          </S.MenuItem>
        </S.MenuList>
      )}

      {section !== null && (
        <S.SectionContainer exiting={exiting} onAnimationEnd={onAnimationEnd}>
          {section === "notifications" && <TenantNotificationsPage />}
          {section === "email" && <EmailConfirmationSection />}
        </S.SectionContainer>
      )}
    </S.PageWrapper>
  );
};

export default More;
