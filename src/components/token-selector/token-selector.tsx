import styled from "@emotion/styled";
import { useState } from "react";
import { NumericalInput } from "../ui/numerical-input";
import { useDisclosure } from "@chakra-ui/react";
import { TokenListModal } from "./token-list-modal";
import { TokenOption } from "./types";
import { getDefaultToken } from "./utils";
import { useClient } from "wagmi";

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
`;

const TokenButton = styled.div`
  width: auto;
  padding: 10px;
  background-color: #dbdbdb;
  border: 1px solid #cecece;
  border-radius: 16px;
  user-select: none;
`;

interface Props {
  className?: string;
}

export const TokenSelector = ({ className }: Props): JSX.Element => {
  const setMax = () => {};
  const client = useClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<TokenOption>(
    getDefaultToken(client!.chain.id)
  );

  console.log(token);

  return (
    <Container className={className}>
      <NumericalInput value={amount} onUserInput={setAmount} />
      <TokenButton onClick={onOpen}>{token?.token.symbol}</TokenButton>
      <TokenListModal isOpen={isOpen} onClose={onClose} onSelect={setToken} />
    </Container>
  );
};
