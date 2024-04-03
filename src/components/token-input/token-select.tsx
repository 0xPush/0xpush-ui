import { useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NumericalInput } from "../ui/numerical-input";
import { TokenButton } from "./token-button";
import { TokenListModal } from "./token-list-modal";
import { TokenOption } from "types/token";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "input button"
    "price action";
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
`;

const Price = styled.div`
  font-size: 12px;
  color: gray;
`;

interface Props {
  className?: string;
  token: TokenOption;
  amount: string;
  onTokenChange: (token: TokenOption) => void;
  onAmountChange: (amount: string) => void;
}

export const TokenInput = ({
  token,
  amount,
  onTokenChange,
  onAmountChange,
  className,
}: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasPrice = false;

  return (
    <>
      <Container className={className}>
        <NumericalInput
          value={amount}
          onUserInput={onAmountChange}
          maxDecimals={token.token.decimals}
        />
        <TokenButton onClick={onOpen} token={token} />
        {hasPrice && <Price>10 USD</Price>}
      </Container>
      <TokenListModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={onTokenChange}
      />
    </>
  );
};
