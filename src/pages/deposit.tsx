import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Heading,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "@tanstack/react-router";
import { Balance, ConnectWalletBlur } from "components/balance";
import { TokenInput, getDefaultToken } from "components/token-input";
import { useTokenBalance } from "hooks/use-token-balance";
import { useTokenSend } from "hooks/use-token-send";
import { useState } from "react";
import { AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { TokenOption } from "types/token";
import { parseUnits } from "viem";
import {
  useAccount
} from "wagmi";
import { moveBg } from "../components/moveBg";
import { PublicKey } from "../components/public-key";
import { QrModal } from "../components/qr-modal";
import { SetupCustomization } from "../components/setup-customization";
import { copyTextToClipboard } from "../lib/copy";
import { usePushWalletContext } from "../providers/push-wallet-provider";

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
  const { account: wallet, privateKey } = usePushWalletContext();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<TokenOption>(getDefaultToken(chain));

  const balance = useTokenBalance(token, address!, chain!);

  const fromPush = !!(router.state.location.search as any).fromPush;
  const hostname = window?.location.origin;

  const {sendToken, pending} = useTokenSend();

  const handleLinkCopy = () => {
    copyTextToClipboard(`${hostname}/w/${privateKey}`);
    toast({
      title: `Push link copied. Share it with the recipient!`,
      status: "info",
    });
  };

  const handleDeposit = async () => {
    sendToken({token, amount, to: wallet.address})
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
                  isLoading={pending}
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
                  params: { privateKey },
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
          qrValue={`${hostname}/w/${privateKey}`}
          title={"QR link to Push"}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Container>
    </Container>
  );
};
