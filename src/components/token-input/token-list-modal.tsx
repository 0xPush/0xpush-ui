import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { forwardRef } from "react";
import { usePushWalletContext } from "../../providers/push-wallet-provider";

import tokenList from "./token-list.json";
import { useClient } from "wagmi";
import { TokenListItem, TokenOption } from "./types";

const List = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  max-height: 60dvh;
  overflow-y: auto;
  padding: 0 10px 0;
`;

const TokenRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-column-gap: 16px;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #dbdbdb;
  }
`;

const Image = styled.img`
  user-select: none;
  width: 32px;
  height: 32px;
`;

const Labels = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Symbol = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

const Name = styled.div`
  font-size: 12px;
`;

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (token: TokenOption) => void;
}

export const TokenListModal = forwardRef<HTMLDivElement | undefined, Props>(
  function TokenListModal({ isOpen, onClose, onSelect }, ref) {
    const { account } = usePushWalletContext();

    const client = useClient();

    const handleSelect = (token: TokenListItem) => {
      onSelect?.({
        token,
        isNative: token.extensions.opListId === "default",
        balanceUSD: null,
        price: null,
        quantity: null,
      });
      onClose();
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
        <ModalContent>
          <ModalHeader fontSize="md">Token list</ModalHeader>
          <ModalCloseButton />
          <List>
            {(tokenList as TokenListItem[])
              .filter((t) => t.chainId === client?.chain.id)
              .map((token, idx) => (
                <TokenRow
                  onClick={() => handleSelect(token)}
                  key={token.address + idx}
                >
                  <Image loading="lazy" src={token.logoURI} />
                  <Labels>
                    <Symbol>{token.symbol}</Symbol>
                    <Name>{token.name}</Name>
                  </Labels>
                </TokenRow>
              ))}
          </List>
        </ModalContent>
      </Modal>
    );
  }
);
