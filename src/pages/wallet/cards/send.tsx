import { Box, Button, Stack, useColorMode, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { TokenOption, getDefaultToken } from "components/token-input";
import { TokenInput } from "components/token-input/token-select";
import { StyledInput } from "components/ui/styled-input";
import { formatEther } from "ethers";
import { useEffect, useState } from "react";
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
  const client = useClient();

  const [amount, setAmount] = useState("0.1");
  const [token, setToken] = useState<TokenOption>(
    getDefaultToken(client!.chain)
  );
  const [to, setTo] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (address) {
      setTo(address);
    }
  }, [address]);

  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

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
          loadingText="Wait..."
          type="submit"
        >
          Send
        </Button>
      </Box>
    </Stack>
  );
};
