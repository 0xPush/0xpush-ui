import styled from "@emotion/styled";
import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { copyTextToClipboard } from "../lib/copy";

const KeyRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  max-width: calc(100% - 10px);
  user-select: none;
`;

const Content = styled.div`
  flex: 1;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 500;
  cursor: pointer;
  height: 32px;
  padding: 5px 6px;
  border-radius: 4px;
  transition: all 0.2s;
  border: 1px solid var(--chakra-colors-chakra-border-color);

  &:hover {
    background-color: rgba(115, 0, 255, 0.09);
  }
`;

interface PublicKeyProps {
  publicKey: string;
}

export const PublicKey = ({ publicKey }: PublicKeyProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const handleClick = () => {
    copyTextToClipboard(publicKey);
    toast({ title: `Address copied`, status: "info" });
  };

  return (
    <Box
      bg={bgColor[colorMode]}
      w="370px"
      maxWidth="100%"
      p={4}
      borderRadius="lg"
      boxShadow="md"
    >
      <Text textAlign="left" fontSize="12px" mb={2}>
        You can send assets to this address
      </Text>
      <KeyRow>
        <Content onClick={handleClick}>{publicKey}</Content>
        <IconButton
          ml={2}
          onClick={handleClick}
          size="sm"
          aria-label="Copy pubkey"
          variant="outline"
          icon={<CopyIcon />}
        />

        <Button ml={1} onClick={onToggle} size="sm" variant="outline">
          QR
        </Button>
      </KeyRow>
      <Collapse in={isOpen}>
        <Stack m={4} align="center">
          <QRCode
            fgColor={colorMode === "light" ? "#1f0023" : "#d2d2d2"}
            bgColor="transparent"
            value={publicKey}
          />
        </Stack>
      </Collapse>
    </Box>
  );
};
