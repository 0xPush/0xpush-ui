import {
  Button,
  InputGroup,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  BrowserProvider,
  TransactionReceipt,
  TransactionRequest,
  TransactionResponse,
  formatEther,
  parseUnits,
} from "ethers";
import { useEffect, useState } from "react";
import { ETHER_TOKEN } from "../types/token";
import { usePushWalletContext } from "../providers/push-wallet-provider";
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
  onSuccess?: (tx: TransactionResponse, receipt: TransactionReceipt) => void;
  onError?: (err: Error) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  fromConnectedWallet?: boolean;
}

export const TransferTokens = ({
  to,
  onError,
  onSuccess,
  disabled,
  className,
  label = "Send",
  fromConnectedWallet = true,
}: Props) => {
  const { wallet, ethBalance, updateBalance, transferEstimateFee } =
    usePushWalletContext();
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const { ethPriceUsd } = usePrice();

  const [amount, setAmount] = useState(parseUnits("0.1"));
  const [input, setInput] = useState("0.1");
  const [token, setToken] = useState(ETHER_TOKEN);

  const [connectedWalletBalance, setConnectedWalletBalanceBalance] =
    useState(0n);

  useEffect(() => {
    // Update balance
    const fn = async () => {
      const ethersProvider = new BrowserProvider(walletProvider!);
      const signer = await ethersProvider.getSigner();
      const balance = await ethersProvider.getBalance(signer.address);
      setConnectedWalletBalanceBalance(balance);
    };

    if (isConnected && fromConnectedWallet) {
      fn();
    }
  }, [isConnected, fromConnectedWallet, walletProvider]);

  const [isSending, setIsSending] = useState(false);
  const usdAmount = (parseFloat(formatEther(amount)) * ethPriceUsd).toFixed(2);

  const handleSend = async () => {
    setIsSending(true);

    if (fromConnectedWallet) {
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
        onSuccess?.(tx, receipt!);
      } catch (e) {
        console.error(e);
        onError?.(e as Error);
      }
    } else {
      // send from push

      try {
        const transaction: TransactionRequest = {
          to,
          value: amount,
          // gasLimit: estimateGas,
          // gasPrice: gasPrice,
        };

        const tx = await wallet.sendTransaction(transaction);
        const receipt = await tx.wait();

        console.log(receipt);
        updateBalance();
        onSuccess?.(tx, receipt!);
      } catch (e) {
        console.error(e);
        onError?.(e as Error);
      }
    }

    setIsSending(false);
  };

  const setMax = () => {
    let value = 0n;

    if (fromConnectedWallet) {
      value = connectedWalletBalance - transferEstimateFee;
    } else {
      value = ethBalance - transferEstimateFee;
    }

    if (value <= 0) {
      value = 0n;
    }

    setAmount(value);
    setInput(formatEther(value));
  };

  const getLabel = () => {
    if (fromConnectedWallet && amount > connectedWalletBalance) {
      return "Insufficient";
    }

    if (!fromConnectedWallet && amount > ethBalance) {
      return "Insufficient";
    }

    return label;
  };

  const isDisabled = () => {
    if (fromConnectedWallet && amount > connectedWalletBalance) {
      return true;
    }

    if (!fromConnectedWallet && amount > ethBalance) {
      return true;
    }

    return disabled || !to || amount === 0n;
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
          isDisabled={isDisabled()}
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
