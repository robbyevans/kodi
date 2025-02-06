import styled from "styled-components";
import { colors, fontSizes } from "../../styles/foundation";

export const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const NotificationIcon = styled.div`
  cursor: pointer;
  position: relative;
  font-size: 24px;
  margin-bottom: -10px;
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 12px;
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 35px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  z-index: 1000;
`;

export const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  color: ${colors.text.primary};

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationTitle = styled.div`
  font-size: ${fontSizes.sm};
`;

export const NotificationContent = styled.div`
  margin-top: 5px;
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  border: none;
  border-top: 1px solid #eee;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #e0e0e0;
  }
`;
