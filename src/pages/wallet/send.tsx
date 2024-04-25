import { Box, Button, Stack, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getDefaultToken } from "components/token-input";
import { TokenInput } from "components/token-input/token-select";
import { StyledInput } from "components/ui/styled-input";
import { useTokenSend } from "hooks/use-token-send";
import { usePushWalletContext } from "providers/push-wallet-provider";
import { useEffect, useState } from "react";
import { TokenOption } from "types/token";
import { Address, isAddress } from "viem";
import { useAccount, useClient } from "wagmi";

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

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<TokenOption>(
    getDefaultToken(client!.chain)
  );
  const [to, setTo] = useState("");

  const {sendToken, pending} = useTokenSend();

  useEffect(() => {
    if (address) {
      setTo(address);
    }
  }, [address]);

  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const handleSend = async () => {
    sendToken({token, amount, to: to as Address, account});
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
          isLoading={pending}
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
