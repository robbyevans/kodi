// File: /web/src/components/Notification/styles.ts
import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  shadows,
  borderRadius,
} from "../../styles/foundation";

export const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xs};
`;

export const NotificationIcon = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  font-size: 1.6rem;
  color: ${colors.neutral[500]};
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -6px;
  background-color: ${colors.error}; /* or #ff5252 */
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 10px;
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
  background-color: #fff;
  border-radius: ${borderRadius.sm};
  box-shadow: ${shadows.md};
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 999;
`;

export const NotificationItem = styled.div`
  padding: ${spacing.md};
  border-bottom: 1px solid ${colors.neutral[200]};
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral[100]};
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NotificationTitle = styled.h4`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${colors.text.primary};
`;

export const ViewButton = styled.button`
  background-color: ${colors.primary};
  color: #fff;
  font-size: ${fontSizes.xs};
  padding: 4px 8px;
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;

  &:hover {
    background-color: #1c675a; /* a bit darker or use your own shade */
  }
`;

export const NotificationContent = styled.p`
  margin: ${spacing.xs} 0 0 0;
  font-size: ${fontSizes.xs};
  color: ${colors.text.secondary};
`;

export const EmptyMessage = styled.div`
  padding: ${spacing.md};
  text-align: center;
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: ${spacing.sm};
  background-color: ${colors.neutral[100]};
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.xs};
  text-align: center;
  border-top: 1px solid ${colors.neutral[200]};

  &:hover {
    background-color: ${colors.neutral[200]};
  }
`;
