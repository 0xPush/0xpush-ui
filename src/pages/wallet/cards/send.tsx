import { Box, Input, Stack, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { TransferTokens } from "../../../components/transfer-tokens";

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
          //   isInvalid={!isPubkeyValid()}
          placeholder="0x123..."
          value={to}
          onChange={({ target: { value } }) => setTo(value)}
        />
        <TransferTokens to={to} />
      </Box>
    </Stack>
  );
};
