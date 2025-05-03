import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantNotificationsPage from "../TenantNotification/TenantNotification";
import EmailConfirmationSection from "../EmailConfirmation/EmailConfirmationSection";
import * as S from "./styles";

const More: React.FC = () => {
  const [section, setSection] = useState<"notifications" | "email" | null>(
    null
  );
  const navigate = useNavigate();

  const handleBack = () => {
    if (section) {
      setSection(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <S.PageWrapper>
      {/* Main menu header */}
      {section === null && (
        <S.MenuHeader>
          <h1>More</h1>
        </S.MenuHeader>
      )}

      {/* Section header (back button only) */}
      {section !== null && (
        <S.SectionHeader>
          <S.BackButton onClick={handleBack}>← Back</S.BackButton>
        </S.SectionHeader>
      )}

      {/* menu list if no section selected */}
      {section === null && (
        <S.MenuList>
          <S.MenuItem onClick={() => setSection("notifications")}>
            Notifications
          </S.MenuItem>
          <S.MenuItem onClick={() => setSection("email")}>
            Email Confirmation
          </S.MenuItem>
          {/* add more <S.MenuItem> here later */}
        </S.MenuList>
      )}

      {/* sliding panel with selected section */}
      {section !== null && (
        <S.SectionContainer>
          {section === "notifications" && <TenantNotificationsPage />}
          {section === "email" && <EmailConfirmationSection />}
        </S.SectionContainer>
      )}
    </S.PageWrapper>
  );
};

export default More;
