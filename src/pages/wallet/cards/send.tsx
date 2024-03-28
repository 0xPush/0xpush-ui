import { Box, Input, Stack, useColorMode, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TransferTokens } from "../../../components/transfer-tokens";
import { formatEther } from "ethers";

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

export const Send = () => {
  const { address } = useWeb3ModalAccount();
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
        <FormLabel>EVM address</FormLabel>
        <Input
          mb={2}
          placeholder="0x123..."
          value={to}
          onChange={({ target: { value } }) => setTo(value)}
        />
        <TransferTokens
          to={to}
          fromConnectedWallet={false}
          onSuccess={(tx) => {
            toast({
              title: `${formatEther(tx.value)} ETH sent. Tx: ${tx.hash}.`,
              status: "success",
            });
          }}
          onError={(e) => toast({ title: e.message, status: "error" })}
        />
      </Box>
    </Stack>
  );
};
