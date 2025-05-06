import styled from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
} from "../../styles/foundation";

export const Container = styled.div`
  height: 100%;
  max-width: 600px;
  margin: ${spacing["2xl"]} auto;
  padding: ${spacing.xl};
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};
`;

export const Header = styled.h1`
  font-size: ${fontSizes["2xl"]};
  color: ${colors.primary};
  text-align: center;
  margin-bottom: ${spacing.lg};
`;

export const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

export const TextInput = styled.input`
  flex: 1;
  padding: ${spacing.sm};
  font-size: ${fontSizes.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
`;

export const AddButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${fontSizes.md};
  background: ${colors.primary};
  color: ${colors.text.inverted};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;

  &:disabled {
    background: ${colors.neutral[300]};
    cursor: not-allowed;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.sm} ${spacing.md};
  border-bottom: 1px solid ${colors.neutral[200]};

  &:last-child {
    border-bottom: none;
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${fontSizes.lg};
  cursor: pointer;
  color: ${colors.primary};

  &:hover {
    color: ${colors.accent};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  padding: ${spacing.lg};
  width: 90%;
  max-width: 400px;
  box-shadow: ${shadows.lg};
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.md};
  h2 {
    margin: 0;
    font-size: ${fontSizes.xl};
    color: ${colors.text.primary};
  }
  p {
    margin: ${spacing.xs} 0 0;
    font-size: ${fontSizes.sm};
    color: ${colors.text.secondary};
  }
`;

export const Flags = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

export const FlagLabel = styled.label`
  font-size: ${fontSizes.md};
  color: ${colors.text.primary};

  input {
    margin-right: ${spacing.sm};
  }
`;

export const CloseButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${fontSizes.md};
  background: ${colors.success};
  color: ${colors.text.inverted};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;

  &:hover {
    background: ${colors.accent};
  }
`;

export const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${fontSizes.md};
  color: ${colors.text.primary};
  cursor: pointer;
`;

export const ToggleInput = styled.input`
  display: none;
`;

export const ToggleSlider = styled.span<{ checked: boolean }>`
  width: 40px;
  height: 20px;
  background-color: ${(props) =>
    props.checked ? colors.success : colors.neutral[300]};
  border-radius: 999px;
  position: relative;
  transition: background-color 0.2s ease;
  border: 1px solid red;

  &::before {
    content: "";
    position: absolute;
    height: 16px;
    width: 16px;
    left: ${(props) => (props.checked ? "20px" : "2px")};
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s ease;
  }
`;
