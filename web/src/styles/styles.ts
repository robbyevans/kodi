import styled from "styled-components";

export const UpdateBanner = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #222;
  color: #fff;
  text-align: center;
  padding: 12px;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 10px;
`;

export const RefreshButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;
