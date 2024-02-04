import {
  Button,
  InputGroup,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BrowserProvider, formatEther, parseUnits } from "ethers";
import { useEffect, useState } from "react";
import { ETHER_TOKEN } from "../models/token";
import { useInnerWalletContext } from "../providers/inner-wallet-provider";
import { usePrice } from "../providers/price-provider";
import { TokenSelect } from "./token-select";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

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
  onSuccess?: (txHash: string) => void;
  onError?: (err: Error) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  useBrowserWallet?: boolean;
}

export const TransferTokens = ({
  to,
  onError,
  onSuccess,
  disabled,
  className,
  label = "Send",
  useBrowserWallet = true,
}: Props) => {
  const { wallet, updateBalance } = useInnerWalletContext();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const { ethPriceUsd } = usePrice();

  const [amount, setAmount] = useState(parseUnits("0.1"));
  const [input, setInput] = useState("0.1");
  const [token, setToken] = useState(ETHER_TOKEN);

  const [balance, setBalance] = useState(0n);

  useEffect(() => {
    // Update balance
    const fn = async () => {
      const ethersProvider = new BrowserProvider(walletProvider!);
      const signer = await ethersProvider.getSigner();
      const balance = await ethersProvider.getBalance(signer.address);
      setBalance(balance);
    };

    if (isConnected && useBrowserWallet) {
      fn();
    }
  }, [isConnected, useBrowserWallet, walletProvider]);

  // const [fee, setFee] = useState(5000);

  const [isSending, setIsSending] = useState(false);
  const usdAmount = (parseFloat(formatEther(amount)) * ethPriceUsd).toFixed(2);

  const handleSend = async () => {
    setIsSending(true);

    if (useBrowserWallet) {
      const ethersProvider = new BrowserProvider(walletProvider!);
      const signer = await ethersProvider.getSigner();

      try {
        const tx = await signer.sendTransaction({
          to,
          value: amount,
        });

        const receipt = await tx.wait();
        console.log(receipt);
        updateBalance();

        onSuccess?.(receipt?.hash as string);
      } catch (e) {
        console.error(e);
        onError?.(e as Error);
      }
    }

    setIsSending(false);
  };

  const setMax = () => {
    // TODO: ensure tx fee
    setInput(formatEther(balance));
    setAmount(balance);
  };

  const getLabel = () => {
    if (amount > balance) {
      return "Insufficient";
    }

    return label;
  };

  return (
    <div className={className}>
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
          isDisabled={!to || disabled || amount > balance || amount === 0n}
          colorScheme="purple"
          isLoading={isSending}
          loadingText="Wait..."
          type="submit"
        >
          {getLabel()} {token?.ticker}
        </Button>
      </Stack>
    </div>
  );
};
