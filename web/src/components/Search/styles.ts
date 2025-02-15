import styled from "styled-components";
import { colors } from "../../styles/foundation";

export const SearchContainer = styled.div<{ isVisible: boolean }>`
  width: ${(props) => (props.isVisible ? "50%" : "0px")};
  transition: width 0.3s ease-in-out;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${colors.primary};
`;

export const SuggestionsDropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;

export const SuggestionItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  color: ${colors.text.primary};
  &:hover {
    background: #eee;
  }
`;
