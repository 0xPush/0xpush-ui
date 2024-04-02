import { InputGroup, NumberInput } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { NumericalInput } from "../ui/numerical-input";

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
`;

const $InputGroup = styled(InputGroup)`
  z-index: 1;
`;

const $NumberInput = styled(NumberInput)`
  flex: 1;
  margin-right: 10px;
` as typeof NumberInput;

const MaxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scale(0.8);
  z-index: 1;
`;

const TokenButton = styled.div`
  width: auto;
  padding: 10px;
  background-color: #dbdbdb;
  border: 1px solid #cecece;
  border-radius: 16px;
`;

interface Props {
  className?: string;
}

export const TokenSelector = ({ className }: Props): JSX.Element => {
  const setMax = () => {};

  const [amount, setAmount] = useState("");
  console.log(amount);

  return (
    <Container className={className}>
      <NumericalInput value={amount} onUserInput={setAmount} />

      <TokenButton>Token</TokenButton>
    </Container>
  );
};
