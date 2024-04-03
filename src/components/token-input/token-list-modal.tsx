import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Box, Input, Modal } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { forwardRef, useState } from "react";
import { usePushWalletContext } from "../../providers/push-wallet-provider";

import tokenList from "./token-list.json";
import { useClient } from "wagmi";
import { TokenListItem, TokenOption } from "types/token";
import { Address, Chain } from "viem";

const List = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  max-height: 60dvh;
  min-height: 60dvh;
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
  address: Address;
  chain: Chain;
  onSelect?: (token: TokenOption) => void;
}

export const TokenListModal = forwardRef<HTMLDivElement | undefined, Props>(
  function TokenListModal({ isOpen, address, chain, onClose, onSelect }, ref) {
    const [search, setSearch] = useState("");

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
          <Box px={5} pb={2}>
            <Input
              placeholder="Enter token name or symbol"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="sm"
            />
          </Box>
          <List>
            {(tokenList as TokenListItem[])
              .filter(
                (t) =>
                  t.chainId === chain.id &&
                  (t.symbol.toLowerCase().includes(search.toLowerCase()) ||
                    t.name.toLowerCase().includes(search.toLowerCase()))
              )
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
