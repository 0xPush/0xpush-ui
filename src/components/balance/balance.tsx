import { Box, Tooltip, useColorMode } from "@chakra-ui/react";

import styled from "@emotion/styled";

import { forwardRef, useState } from "react";
import { usePushWalletContext } from "../../providers/push-wallet-provider";

import { formatUnits } from "ethers";
import EtherLogo from "../../assets/eth-logo.svg?react";

const $Box = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 16px;
`;

const BalanceItem = styled.div<{ nft?: boolean; first?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  transition: all 0.1s;
  cursor: default;

  &:hover {
    img {
      transform: scale(1.05);
    }

    background-color: rgba(162, 19, 245, 0.05);
  }

  img {
    -webkit-user-drag: none;
    user-select: none;
    object-fit: contain;
  }
`;

const Row = styled.div<{ isNft?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-left: ${(p) => (p.isNft ? " -5px" : "0")};
  gap: ${(p) => (p.isNft ? " 14px" : "20px")};
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const CoinName = styled.div`
  font-weight: 600;
`;

const CoinAmount = styled.div``;

const UsdAmountWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;
`;

const UsdAmount = styled.div<{ dark: boolean }>`
  justify-self: flex-end;
  font-size: 14px;
  font-weight: 500;
`;

interface BalanceDisplayProps {
  className?: string;
}

export const Balance = forwardRef<
  HTMLDivElement | undefined,
  BalanceDisplayProps
>(function BalanceDisplay({ className }, ref) {
  const {
    account: wallet,
    ethBalance,
    totalUsdAmount,
  } = usePushWalletContext();

  //   wallet.provider?.getBalance()

  const [showMore, setShowMore] = useState(true);
  //   const [nft, setNft] = useState<NftItem>();

  //   const {
  //     isOpen: nftIsOpen,
  //     onClose: onNftClose,
  //     onOpen: openNft,
  //   } = useDisclosure();
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <$Box
      className={className}
      // @ts-ignore
      ref={ref}
      bg={bgColor[colorMode]}
      width="370px"
      maxWidth="100%"
      pt={4}
      //   pb={tokens.length > 0 ? 1 : 4}
      pb={4}
      borderRadius="lg"
      boxShadow="md"
    >
      {/* <NftModal nft={nft!} isOpen={nftIsOpen} onClose={onNftClose} /> */}
      <Tooltip label="4% APR yield">
        <BalanceItem key={0}>
          <Row>
            <EtherLogo width={28} height={28} />
            <Column>
              <CoinName>Ethereum</CoinName>
              <CoinAmount>
                {ethBalance?.formatted} {ethBalance?.symbol}
              </CoinAmount>
            </Column>
          </Row>
          <UsdAmountWrapper>
            {/* <Tooltip>
            <AiOutlineThunderbolt height="40px" width="40px" fill="red" />
          </Tooltip> */}
            <UsdAmount dark={colorMode === "dark"}>
              ${totalUsdAmount} USD
            </UsdAmount>
          </UsdAmountWrapper>
        </BalanceItem>
      </Tooltip>
      {/* {showMore && tokens.length > 0 && <Divider my={0} py={0} />} */}
      {/* {tokens.length > 0 && (
        <Collapse in={showMore}>
          <Stack spacing={2}>
            {tokens?.map((token, index) => {
              const { tokenAmount, info, raw, nft } = token;
              return !nft ? (
                <BalanceItem key={raw.info.mint} nft={!!nft}>
                  <Row>
                    <Image
                      width={42}
                      height={42}
                      src={(info?.logoURI as string) ?? CoinIcon}
                      alt={info?.symbol || "Unknown token"}
                    />
                    <Column>
                      <CoinName>{info?.name || "Unknown token"}</CoinName>
                      <CoinAmount>
                        {tokenAmount.uiAmount} {info?.symbol}
                      </CoinAmount>
                    </Column>
                  </Row>
                  {!info?.name && <UsdAmount>{getShortMint(token)}</UsdAmount>}
                </BalanceItem>
              ) : (
                <BalanceItem key={raw.info.mint} nft={!!nft}>
                  <Row isNft={true}>
                    <img
                      width={50}
                      height={50}
                      src={(nft.imageUrl as string) ?? CoinIcon}
                      alt={nft.name}
                      style={{ borderRadius: "4px" }}
                    />
                    <Column>
                      <CoinName>{nft.name}</CoinName>
                      <CoinAmount>NFT</CoinAmount>
                    </Column>
                  </Row>
                  <UsdAmount>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="pink"
                      marginRight="2px"
                      onClick={() => {
                        setNft(nft);
                        openNft();
                      }}
                    >
                      View
                    </Button>
                  </UsdAmount>
                </BalanceItem>
              );
            })}
          </Stack>
        </Collapse>
      )} */}
      {/* {tokens.length > 0 && (
        <Stack mt={-4}>
          <Button
            size="sm"
            fontWeight="500"
            fontSize="12px"
            variant="ghost"
            onClick={() => setShowMore(!showMore)}
            rightIcon={showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
          >
            {showMore ? "Show less" : `Show all tokens (${tokens.length + 1})`}
          </Button>
        </Stack>
      )} */}
    </$Box>
  );
});
