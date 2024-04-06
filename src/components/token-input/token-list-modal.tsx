import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Box, Input, Modal } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { forwardRef, useEffect, useMemo, useState } from "react";

import { TokenOption } from "types/token";
import { Address, Chain, formatUnits } from "viem";
import { getTokenOptionList } from "./utils";
import { useMulticallBalance } from "hooks/use-multicall-balance";

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

const Balance = styled.div`
  font-size: 12px;
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

    const [balances, setBalances] = useState<Record<Address, bigint>>({});

    const options = useMemo(() => getTokenOptionList(chain), [chain]);
    const filteredOptions = useMemo(
      () =>
        options.filter(
          (token) =>
            token.token.symbol.toLowerCase().includes(search.toLowerCase()) ||
            token.token.name.toLowerCase().includes(search.toLowerCase())
        ),
      [options, search]
    );

    const getBalance = useMulticallBalance(chain, address);

    useEffect(() => {
      getBalance().then((res) => setBalances(res));
    }, [getBalance]);

    const handleSelect = (token: TokenOption) => {
      onSelect?.(token);
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
            {filteredOptions.map((token, idx) => {
              const balance = balances[token.token.address as Address] ?? 0n;
              const formattedBalance = formatUnits(
                balance,
                token.token.decimals
              );
              return (
                <TokenRow
                  onClick={() => handleSelect(token)}
                  key={token.token.address + idx}
                >
                  <Image loading="lazy" src={token.token.logoURI} />
                  <Labels>
                    <Symbol>{token.token.symbol}</Symbol>
                    <Name>{token.token.name}</Name>
                  </Labels>
                  {balance > 0n && <Balance>{formattedBalance}</Balance>}
                </TokenRow>
              );
            })}
          </List>
        </ModalContent>
      </Modal>
    );
  }
);
