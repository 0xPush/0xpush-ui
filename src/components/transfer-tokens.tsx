import {
  Button,
  InputGroup,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { formatEther, parseUnits } from "ethers";
import { useState } from "react";
import { ETHER_TOKEN, Token } from "../models/token";
import { useInnerWalletContext } from "../providers/inner-wallet-provider";
import { usePrice } from "../providers/price-provider";
import { TokenSelect } from "./token-select";

const $InputGroup = styled(InputGroup)`
  z-index: 1;
`;

const $NumberInput = styled(NumberInput)`
  flex: 1;
  margin-right: 10px;
` as typeof NumberInput;

const $TokenSelect = styled(TokenSelect)`
  flex: 1;
  max-width: 80px;
`;

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

const FormLabel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-right: 0;
  margin-bottom: 6px;
  margin-left: 4px;
  font-size: 12px;
`;

interface Props {
  to: string;
  onSuccess?: (sig: string) => void;
  onError?: (err: Error) => void;
  initialAmount?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  max?: number;
}

export const TransferTokens = ({
  to,
  onError,
  onSuccess,
  disabled,
  className,
  label = "Send",
}: Props) => {
  const { wallet } = useInnerWalletContext();

  const { ethPriceUsd } = usePrice();

  const [amount, setAmount] = useState<bigint>(0n);
  const [input, setInput] = useState<string>("0");
  const [token, setToken] = useState<Token>(ETHER_TOKEN);

  // const [fee, setFee] = useState(5000);

  const [isSending, setIsSending] = useState(false);

  const usdAmount = (parseFloat(formatEther(amount)) * ethPriceUsd).toFixed(2);

  const handleSend = async () => {
    setIsSending(true);
    setIsSending(false);
  };

  const getMax = () => {
    const value: number = 0;
    // if (!token) {
    //   value = (lamports - fee) / LAMPORTS_PER_SOL;
    // } else {
    //   value =
    //     tokens.find((item) => item.raw.info.mint === token!.raw.info.mint)
    //       ?.tokenAmount.uiAmount || 0;
    // }
    return value;
  };

  const setMax = () => {
    setInput(String(getMax()));
    // setAmount(getMax());
  };

  //   useEffect(() => {
  //     setMax();
  //   }, [balanceHash, token]);

  return (
    <>
      <FormLabel>You pay</FormLabel>
      <$InputGroup mb={2}>
        <$NumberInput
          onChange={(valueString: string) => {
            setInput(valueString);
            setAmount(parseUnits(valueString));
          }}
          value={input}
          min={0}
          step={0.01}
        >
          <NumberInputField />
          <MaxContainer>
            <Button onClick={setMax} size="sm" variant="ghost">
              max
            </Button>
          </MaxContainer>
        </$NumberInput>
        <$TokenSelect onChange={setToken} />
      </$InputGroup>
      <Text textAlign="center" mt={2} fontSize="sm" color="gray">
        {usdAmount} USD
      </Text>
      <Stack mt={3} justify="center">
        <Button
          onClick={handleSend}
          disabled={!to || disabled || amount > getMax() || amount === 0n}
          colorScheme="purple"
          isLoading={isSending}
          loadingText="Wait..."
          type="submit"
        >
          {label} {token?.ticker}
        </Button>
      </Stack>
    </>
  );
};
