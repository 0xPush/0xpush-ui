import { Box, Button, FormControl, FormErrorMessage, Stack, useColorMode, useToast } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { getDefaultToken } from "components/token-input";
import { TokenInput } from "components/token-input/token-select";
import { StyledInput } from "components/ui/styled-input";
import { useTokens } from "hooks/use-tokens";
import { usePushWalletContext } from "providers/push-wallet-provider";
import { config } from "providers/wagmi-web3-provider";
import { useEffect, useState } from "react";
import { TokenOption } from "types/token";
import { Address, erc20Abi, formatUnits, isAddress, parseUnits } from "viem";
import { useAccount, useClient, useSendTransaction, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

const FormLabel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-right: 0;
  margin-bottom: 6px;
  font-size: 12px;
`;

const AddressInput = styled(StyledInput)`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
`;

export const Send = () => {
  const { address } = useAccount();
  const {chain, account} = usePushWalletContext();
  const client = useClient();
  const toast = useToast();

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<TokenOption>(
    getDefaultToken(client!.chain)
  );
  const [to, setTo] = useState("");

  const {refetchBalance} = useTokens(chain, account?.address as Address);

  const [isLoading, setIsLoading] = useState(false);
  const { sendTransaction } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (address) {
      setTo(address);
    }
  }, [address]);

  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  // TODO: common hook with deposit.tsx
  const handleSend = async () => {
    setIsLoading(true);
    if (token.isNative) {
      sendTransaction(
        {
          to: to as Address,
          value: parseUnits(amount, token.token.decimals),
          account,
        },
        {
          onSuccess: async (hash) => {
            const data = await waitForTransactionReceipt(config, {hash})
            console.log(data);
            setIsLoading(false)
            toast({
              title: `${formatUnits(parseUnits(amount, token.token.decimals), token.token.decimals)} ${token.token.symbol} sent. Tx: ${hash}.`,
              status: "success",
            })
            refetchBalance();
          },
          onError: (e) => {
            console.log(e)
            // @ts-ignore
            toast({title: e.message, status: "error"})
            setIsLoading(false)
          },
        }
      );
    } else {

      try {
        const hash = await writeContractAsync({
          abi: erc20Abi,
          address: token.token.address as Address,
          functionName: "transfer",
          args: [to as Address, parseUnits(amount, token.token.decimals)],
          account
        })

        const data = await waitForTransactionReceipt(config, {hash});
        console.log(data);

        setIsLoading(false)
        toast({
          title: `${formatUnits(parseUnits(amount, token.token.decimals), token.token.decimals)} ${token.token.symbol} sent. Tx: ${hash}.`,
          status: "success",
        })
      } catch(e) {
        console.log(e)
        // @ts-ignore
        toast({title: e?.message || "Unknown error", status: "error"})
      } finally {
        refetchBalance();
        setIsLoading(false);
      }
  }}

  return (
    <Stack>
      <Box
        bg={bgColor[colorMode]}
        w="370px"
        maxWidth="100%"
        p={4}
        borderRadius="lg"
        boxShadow="md"
      >
        <Box mb={4}>
          <FormLabel>You pay</FormLabel>
          <TokenInput
            chain={chain}
            address={account.address}
            token={token}
            amount={amount}
            onTokenChange={setToken}
            onAmountChange={setAmount}
          />
        </Box>
        <Box mb={4}>
          <FormLabel>EVM address</FormLabel>
          <AddressInput
            placeholder="0xa1a2b..."
            value={to}
            onChange={({ target: { value } }) => setTo(value)}
          />
        </Box>
        <Button
          w="100%"
          colorScheme="red"
          isLoading={isLoading}
          isDisabled={false || !isAddress(to)}
          onClick={handleSend}
          loadingText="Wait..."
          type="submit"
        >
          Send
        </Button>
      </Box>
    </Stack>
  );
};
