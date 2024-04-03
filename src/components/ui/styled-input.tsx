import styled from "@emotion/styled";

export const StyledInput = styled.input<{
  error?: boolean;
  fontSize?: string;
  align?: string;
  disabled?: boolean;
}>`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  text-align: ${(p) => p.align || "left"};

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type="number"] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: gray;
  }
`;
