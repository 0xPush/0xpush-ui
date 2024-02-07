import { CopyIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Alert,
  AlertIcon,
  IconButton,
  Link,
  Modal,
  Tag,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { forwardRef } from "react";
import { copyTextToClipboard } from "../../lib/copy";
import { useInnerWalletContext } from "../../providers/inner-wallet-provider";

const KeyRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 5px;
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

interface ExportWalletProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportWalletModal = forwardRef<
  HTMLDivElement | undefined,
  ExportWalletProps
>(function ExportWallet({ isOpen, onClose }, ref) {
  const { privateKey, wallet } = useInnerWalletContext();
  const { isOpen: showSecret, onToggle: toggleSecret } = useDisclosure();
  const toast = useToast();

  const handleClick = () => {
    copyTextToClipboard(privateKey);
    toast({ title: "Private Key copied", status: "info" });
  };

  const copyAddress = () => {
    copyTextToClipboard(wallet.address);
    toast({ title: "Address copied", status: "info" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
      <ModalContent>
        <ModalHeader fontSize="md">Export wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <span>You can use the funds in another wallet, such as </span>
          <Link
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Tag px={1}>Metamask</Tag>
          </Link>{" "}
          <span>or </span>
          <Link
            href="https://rainbow.me/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Tag px={1}>Rainbow.</Tag>
          </Link>
          <p style={{ marginTop: "10px" }}>
            To do this, import the private key specified below in the wallet
            interface.
          </p>
          <p style={{ marginTop: "15px" }}>Address</p>
          <KeyRow>
            <Content onClick={copyAddress}>{wallet.address}</Content>
            <IconButton
              ml={2}
              onClick={copyAddress}
              size="sm"
              aria-label="Copy pubkey"
              variant="outline"
              icon={<CopyIcon />}
            />
          </KeyRow>
          <p style={{ marginTop: "15px" }}>Private Key</p>
          <KeyRow>
            <Content onClick={handleClick}>
              {showSecret
                ? privateKey
                : "**************************************"}
            </Content>
            <IconButton
              ml={2}
              onClick={toggleSecret}
              size="sm"
              aria-label="show"
              variant="outline"
              icon={showSecret ? <ViewOffIcon /> : <ViewIcon />}
            />
          </KeyRow>
          <Alert my={4} p={2} borderRadius="md" status="warning" fontSize="sm">
            <AlertIcon />
            <span>
              Do not share the link to this page and the private key with
              anyone. This data gives access to funds.
            </span>
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
