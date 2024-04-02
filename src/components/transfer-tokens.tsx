import { Button, Stack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  TransactionReceipt,
  TransactionResponse,
  formatEther,
  parseUnits,
} from "ethers";
import { useState } from "react";
import { useAccount, useClient } from "wagmi";
import { usePrice } from "../providers/price-provider";
import { usePushWalletContext } from "../providers/push-wallet-provider";
import { ETHER_TOKEN } from "../types/token";
import { TokenSelector } from "./token-selector/token-selector";

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
  const { account, ethBalance } = usePushWalletContext();
  const { isConnected } = useAccount();
  const client = useClient();

  const { ethPriceUsd } = usePrice();

  const [amount, setAmount] = useState(parseUnits("0.1"));
  const [input, setInput] = useState("0.1");
  const [token, setToken] = useState(ETHER_TOKEN);

  const [connectedWalletBalance, setConnectedWalletBalanceBalance] =
    useState(0n);

  // useEffect(() => {
  //   // Update balance
  //   const fn = async () => {
  //     const ethersProvider = new BrowserProvider(walletProvider!);
  //     const signer = await ethersProvider.getSigner();
  //     const balance = await ethersProvider.getBalance(signer.address);
  //     setConnectedWalletBalanceBalance(balance);
  //   };

  //   if (isConnected && fromConnectedWallet) {
  //     fn();
  //   }
  // }, [isConnected, fromConnectedWallet, walletProvider]);

  const [isSending, setIsSending] = useState(false);
  const usdAmount = (parseFloat(formatEther(amount)) * ethPriceUsd).toFixed(2);

  // const getLabel = () => {
  //   if (fromConnectedWallet && amount > connectedWalletBalance) {
  //     return "Insufficient";
  //   }

  //   if (!fromConnectedWallet && amount > ethBalance) {
  //     return "Insufficient";
  //   }

  //   return label;
  // };

  const isDisabled = () => {
    if (fromConnectedWallet && amount > connectedWalletBalance) {
      return true;
    }

    // if (!fromConnectedWallet && amount > ethBalance) {
    //   return true;
    // }

    return disabled || !to || amount === 0n;
  };

  return (
    <div className={className}>
      <FormLabel>You pay</FormLabel>

      <TokenSelector />

      <Text textAlign="center" mt={2} fontSize="sm" color="gray">
        {usdAmount} USD
      </Text>
      <Stack mt={3} justify="center">
        <Button
          // onClick={handleSend}
          isDisabled={isDisabled()}
          colorScheme="purple"
          isLoading={isSending}
          loadingText="Wait..."
          type="submit"
        >
          {/* {getLabel()} {token?.ticker} */}
        </Button>
      </Stack>
    </div>
  );
};
