import { Box, Button, Stack, useColorMode, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getDefaultToken } from "components/token-input";
import { TokenInput } from "components/token-input/token-select";
import { StyledInput } from "components/ui/styled-input";
import { usePushWalletContext } from "providers/push-wallet-provider";
import { useEffect, useState } from "react";
import { TokenOption } from "types/token";
import { Address, erc20Abi, formatUnits, parseUnits } from "viem";
import { sendTransaction } from "viem/actions";
import { useAccount, useClient, useSendTransaction, useWriteContract } from "wagmi";

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

  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (address) {
      setTo(address);
    }
  }, [address]);

  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const handleSend = () => {
    if (token.isNative) {
      sendTransaction(
        {
          to: to as Address,
          value: parseUnits(amount, token.token.decimals),
          account,
        },
        {
          onSuccess: () =>
            toast({
              title: `${formatUnits(parseUnits(amount, token.token.decimals), token.token.decimals)} ${token.token.symbol} sent. Tx: ${hash}.`,
              status: "success",
            }),
        }
      );
    } else {
      writeContractAsync({
        abi: erc20Abi,
        address: token.token.address as Address,
        functionName: "transfer",
        args: [to as Address, parseUnits(amount, token.token.decimals)],
        account,
      })
        .then((data) =>
          toast({
            title: `Tx sent: ${data}.`,
            status: "success",
          })
        )
        .catch((e) => console.log(e));
    }
  };

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
          isLoading={false}
          isDisabled={false}
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
