import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const Item = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 370px;
  max-width: 100%;
  padding: 12px 16px;
  cursor: default;
  transition: all 0.1s;

  &:hover {
    transform: scale(1.01);
  }

  & + & {
    margin-top: 14px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  gap: 2px;
`;

export const LogoContainer = styled.div`
  margin-right: 20px;
`;

export const Percent = styled.div`
  margin-right: 8px;
  font-size: 12px;
  color: #888888;
`;
