import styled from "styled-components";
import { colors, fontSizes } from "../../styles/foundation";

export const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 8px;
`;

export const NotificationIcon = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  font-size: 1.6rem;
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 10px;
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 35px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  color: ${colors.text.primary};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${colors.neutral[200]};
  }
`;

export const NotificationTitle = styled.div`
  font-size: ${fontSizes.sm};
  font-weight: bold;
`;

export const NotificationContent = styled.div`
  margin-top: 5px;
  font-size: ${fontSizes.xs};
  color: ${colors.text.secondary};
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #f5f5f5;
  border: none;
  border-top: 1px solid #eee;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #e0e0e0;
  }
`;
