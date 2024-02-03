import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Modal, useColorMode } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import styled from "@emotion/styled";

const QRContainer = styled.div<{ bg: string }>`
  padding: 20px;
  background: ${(p) => p.bg};
`;

interface QrModalProps {
  qrValue: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal = ({ qrValue, title, isOpen, onClose }: QrModalProps) => {
  const { colorMode } = useColorMode();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
      <ModalContent>
        <ModalHeader fontSize="md">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8} display="flex" justifyContent="center">
          <QRContainer bg={colorMode === "light" ? "#f5f5f5" : "#ceaefa"}>
            <QRCode
              width={320}
              bgColor={colorMode === "light" ? "transparent" : "#ceaefa"}
              value={qrValue}
            />
          </QRContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
