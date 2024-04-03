import styled from "@emotion/styled";
import { TokenOption } from "./types";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
  height: 34px;
  width: auto;
  background-color: #dbdbdb35;
  border: 1px solid #cecece7e;
  border-radius: 16px;
  padding: 0 8px 0 2px;
  user-select: none;
  transition: background-color 0.2s;
  box-shadow: 0 2px 2px 2px rgba(184, 184, 184, 0.163);

  &:hover {
    cursor: pointer;
    background-color: #dbdbdb76;
  }
`;

const Image = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  -webkit-user-drag: none;
`;

const Ticker = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

interface Props {
  className?: string;
  token: TokenOption;
  onClick?: () => void;
}

export const TokenButton = ({
  onClick,
  token,
  className,
}: Props): JSX.Element => {
  return (
    <Container onClick={onClick} className={className}>
      <Image src={token.token.logoURI} />
      <Ticker>{token.token.symbol}</Ticker>
      <ChevronDownIcon width="20px" color="gray.600" ml={-2} mr={-1} />
    </Container>
  );
};
