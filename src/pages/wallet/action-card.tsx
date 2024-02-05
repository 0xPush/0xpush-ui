import styled from "@emotion/styled";
import { Box, useColorMode } from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";
import { css } from "@emotion/react";

const $Box = styled(Box)<{ active: number }>`
  display: flex;
  flex-flow: column nowrap;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  user-select: none;
  -webkit-user-drag: none;

  :hover {
    transform: scale(1.03);
    background: linear-gradient(
      to right bottom,
      rgba(224, 51, 129, 0.53),
      rgba(70, 1, 154, 0.6)
    );
    color: #fff;
  }

  ${(p) =>
    p.active &&
    css`
      background: linear-gradient(
        to right bottom,
        rgba(70, 1, 154, 0.6),
        rgba(224, 51, 129, 0.53)
      );
      color: #fff;
      filter: hue-rotate(60deg);
    `}
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;

interface ActionCardProps {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  active?: boolean;
}

export const ActionCard = forwardRef<
  HTMLDivElement | undefined,
  ActionCardProps
>(function ActionCard({ children, onClick, active, label }, ref) {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <$Box
      // @ts-ignore
      ref={ref}
      bg={bgColor[colorMode]}
      p={3}
      borderRadius="lg"
      boxShadow="md"
      onClick={onClick}
      active={active ? 1 : 0}
    >
      <Label>{label}</Label>
      <Content>{children}</Content>
    </$Box>
  );
});
