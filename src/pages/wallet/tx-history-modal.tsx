import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/react";
import { TransactionsList } from "@covalenthq/goldrush-kit";
import { forwardRef } from "react";
import { usePushWalletContext } from "../../providers/push-wallet-provider";

interface ExportWalletProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionHistoryModal = forwardRef<
  HTMLDivElement | undefined,
  ExportWalletProps
>(function TransactionHistoryModal({ isOpen, onClose }, ref) {
  const { account } = usePushWalletContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="50%">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
      <ModalContent w="auto">
        <ModalHeader fontSize="md">Transaction history</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <TransactionsList
            address={account.address}
            chain_name="scroll-sepolia-testnet"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
