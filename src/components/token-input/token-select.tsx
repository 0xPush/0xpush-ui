import { Button, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NumericalInput } from "../ui/numerical-input";
import { TokenButton } from "./token-button";
import { TokenListModal } from "./token-list-modal";
import { TokenOption } from "types/token";
import { useTokenBalance } from "hooks/use-token-balance";
import { Address, Chain, formatUnits, parseUnits } from "viem";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "input button"
    "price action";
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 8px;
  row-gap: 4px;
`;

const Price = styled.div`
  font-size: 12px;
  color: gray;
`;

const Balance = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface Props {
  className?: string;
  token: TokenOption;
  amount: string;
  onTokenChange: (token: TokenOption) => void;
  onAmountChange: (amount: string) => void;
  address: Address;
  chain: Chain;
}

export const TokenInput = ({
  token,
  amount,
  onTokenChange,
  onAmountChange,
  address,
  chain,
  className,
}: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const balance = useTokenBalance(token, address, chain);

  return (
    <>
      <Container className={className}>
        <NumericalInput
          value={amount}
          onUserInput={onAmountChange}
          maxDecimals={token.token.decimals}
        />
        <TokenButton onClick={onOpen} token={token} />
        <Price></Price>
        <Balance>
          <Button
            variant="ghost"
            size="xs"
            onClick={() =>
              onAmountChange(formatUnits(balance, token.token.decimals))
            }
          >
            Max
          </Button>
        </Balance>
      </Container>
      <TokenListModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={onTokenChange}
        address={address}
        chain={chain}
      />
    </>
  );
};
