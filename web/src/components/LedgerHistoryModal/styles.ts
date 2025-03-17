import styled from "styled-components";
import {
  colors,
  spacing,
  borderRadius,
  fontSizes,
} from "../../styles/foundation";

export const ModalContent = styled.div`
  background: #fff;
  border-radius: ${borderRadius.md};
  width: 80%;
  max-width: 800px;
  margin: 2rem auto;
  padding: ${spacing.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: ${fontSizes["2xl"]};
    color: ${colors.primary};
  }

  button {
    background: none;
    border: none;
    font-size: ${fontSizes["xl"]};
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  margin-top: ${spacing.md};
  max-height: 400px;
  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: ${spacing.md};

    th,
    td {
      border: 1px solid ${colors.neutral[300]};
      padding: ${spacing.sm};
      text-align: left;
    }

    th {
      background: ${colors.neutral[200]};
    }
  }
`;

export const ModalFooter = styled.div`
  margin-top: ${spacing.md};
  text-align: right;

  button {
    padding: ${spacing.sm} ${spacing.md};
    background-color: ${colors.primary};
    color: #fff;
    border: none;
    border-radius: ${borderRadius.sm};
    cursor: pointer;

    &:hover {
      background-color: ${colors.secondary};
    }
  }
`;
