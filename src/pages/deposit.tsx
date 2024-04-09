import styled from "@emotion/styled";
import { usePushWalletContext } from "../providers/push-wallet-provider";
import {
  Fade,
  Heading,
  Stack,
  useColorMode,
  useDisclosure,
  Text,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import { moveBg } from "../components/moveBg";
import { useRouter } from "@tanstack/react-router";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { PublicKey } from "../components/public-key";
import { QrModal } from "../components/qr-modal";
import { copyTextToClipboard } from "../lib/copy";
import { Balance, ConnectWalletBlur } from "components/balance";
import { SetupCustomization } from "../components/setup-customization";
import { AiOutlineQrcode, AiOutlineLink } from "react-icons/ai";
import { TokenInput, getDefaultToken } from "components/token-input";
import { TokenOption } from "types/token";
import { useState } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Address, erc20Abi, formatUnits, parseUnits } from "viem";
import { useTokenBalance } from "hooks/use-token-balance";

const Container = styled.div`
  margin-top: 2vh;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  z-index: 1;
`;

const FormLabel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-right: 0;
  margin-bottom: 6px;
  font-size: 12px;
`;

const $Heading = styled(Heading)`
  font-size: 2.2rem !important;
  ${moveBg};
`;

interface Props {
  className?: string;
}

export const Deposit = ({ className }: Props): JSX.Element => {
  const { address, chain } = useAccount();
  const { account: wallet } = usePushWalletContext();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<TokenOption>(getDefaultToken(chain));

  const balance = useTokenBalance(token, address!, chain!);

  const fromPush = !!(router.state.location.search as any).fromPush;
  const hostname = window?.location.origin;

  const handleLinkCopy = () => {
    copyTextToClipboard(`${hostname}/w/${wallet.source}`);
    toast({
      title: `Push link copied. Share it with the recipient!`,
      status: "info",
    });
  };

  const handleDeposit = () => {
    if (token.isNative) {
      sendTransaction(
        {
          to: wallet.address,
          value: parseUnits(amount, token.token.decimals),
        },
        {
          onSuccess: () =>
            toast({
              title: `${formatUnits(parseUnits(amount, token.token.decimals), token.token.decimals)} ${token.token.symbol} sent. Tx: ${hash}.`,
              status: "success",
            }),
        }
      );
    } else {
      writeContractAsync({
        abi: erc20Abi,
        address: token.token.address as Address,
        functionName: "transfer",
        args: [wallet.address, parseUnits(amount, token.token.decimals)],
      })
        .then((data) =>
          toast({
            title: `Tx sent: ${data}.`,
            status: "success",
          })
        )
        .catch((e) => console.log(e));
    }
  };

  const getDepositButtonLabel = () => {
    if (balance < parseUnits(amount, token.token.decimals)) {
      return `Insufficient ${token.token.symbol}`;
    } else {
      return `Deposit ${token.token.symbol}`;
    }
  };

  return (
    <Container className={className}>
      <Container>
        <Fade in={true}>
          <Stack justify="center" align="center" mb={2} mx={2}>
            <$Heading size="lg" textAlign="center" {...(fromPush && { mb: 4 })}>
              {fromPush ? "Deposit" : "Deposit and share"}
            </$Heading>
            {!fromPush && (
              <Text mb={4} textAlign="center">
                The recipient will get crypto via the link
              </Text>
            )}
          </Stack>
        </Fade>
        <Stack justify="center" align="center">
          <Fade in={true}>
            <Balance />
          </Fade>
        </Stack>
        <Stack justify="center" align="center" mt={6}>
          <PublicKey publicKey={wallet.address} />
        </Stack>
        <Stack my={5} justify="center" align="center">
          <Fade in={true}>
            <ConnectWalletBlur>
              <Box
                bg={bgColor[colorMode]}
                w="370px"
                maxWidth="100%"
                p={4}
                borderRadius="lg"
                boxShadow="md"
              >
                <FormLabel>You pay</FormLabel>
                <TokenInput
                  token={token}
                  onTokenChange={setToken}
                  amount={amount}
                  onAmountChange={setAmount}
                  address={address!}
                  chain={chain!}
                />
                <Button
                  w="100%"
                  mt={4}
                  colorScheme="red"
                  isLoading={isPending || isConfirming}
                  loadingText="Wait..."
                  type="submit"
                  onClick={handleDeposit}
                  isDisabled={
                    balance < parseUnits(amount, token.token.decimals) ||
                    !amount
                  }
                >
                  {getDepositButtonLabel()}
                </Button>
                {/* <TransferTokens
                  to={wallet.address}
                  onSuccess={(tx) => {
                    toast({
                      title: `${formatEther(tx.value)} ETH sent. Tx: ${tx.hash}.`,
                      status: "success",
                    });
                  }}
                  label="Deposit"
                  onError={(e) => toast({ title: e.message, status: "error" })}
                /> */}
              </Box>
            </ConnectWalletBlur>
          </Fade>
        </Stack>

        {!fromPush && (
          <Stack mb={5} justify="center" align="center">
            <Fade in={true}>
              <ConnectWalletBlur>
                <Box
                  bg={bgColor[colorMode]}
                  w="370px"
                  maxWidth="100%"
                  p={4}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <SetupCustomization
                    to={wallet.address}
                    onSuccess={(tx) => {
                      toast({
                        title: `Data saved. Tx: ${tx.hash}.`,
                        status: "success",
                      });
                    }}
                    onError={(e) =>
                      toast({ title: e.message, status: "error" })
                    }
                  />
                </Box>
              </ConnectWalletBlur>
            </Fade>
          </Stack>
        )}
        <Stack mt={5} mb={7} justify="center" align="center">
          <Stack direction="row" justify="center" align="center" gap={3}>
            <Button
              rightIcon={<AiOutlineLink />}
              onClick={handleLinkCopy}
              variant="outline"
              colorScheme="red"
            >
              {fromPush ? "Copy link" : "Share"}
            </Button>
            {!fromPush && (
              <Button
                rightIcon={<AiOutlineQrcode />}
                onClick={onOpen}
                variant="outline"
                colorScheme="red"
              >
                Show
              </Button>
            )}
          </Stack>
        </Stack>
        {fromPush && (
          <Stack justify="center" align="center">
            <Button
              onClick={() =>
                router.navigate({
                  to: `/w/$privateKey`,
                  params: { privateKey: wallet.source },
                })
              }
              leftIcon={<ChevronLeftIcon />}
              variant="ghost"
            >
              Back to push
            </Button>
          </Stack>
        )}
        <QrModal
          qrValue={`${hostname}/w/${wallet.source}`}
          title={"QR link to Push"}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Container>
    </Container>
  );
};
