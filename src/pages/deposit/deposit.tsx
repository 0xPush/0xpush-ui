import styled from "@emotion/styled";
import { useInnerWalletContext } from "../../providers/inner-wallet-provider";
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
import { moveBg } from "../../components/moveBg";
import { useRouter } from "@tanstack/react-router";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { PublicKey } from "../../components/public-key";
import { QrModal } from "../../components/qr-modal";
import { copyTextToClipboard } from "../../lib/copy";
import { Balance } from "../../components/balance/balance";
import { ConnectWalletBlur } from "../../components/balance/connect-wallet-blur";
import { TransferTokens } from "../../components/transfer-tokens";
import { formatEther } from "ethers";
import { SetupCustomization } from "../../components/setup-customization";
import { AiOutlineQrcode, AiOutlineLink } from "react-icons/ai";

const Container = styled.div`
  margin-top: 2vh;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  z-index: 1;
`;

const $Heading = styled(Heading)`
  font-size: 2.2rem !important;
  ${moveBg};
`;

interface Props {
  className?: string;
}

export const Deposit = ({ className }: Props): JSX.Element => {
  const { wallet } = useInnerWalletContext();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const router = useRouter();

  const fromPush = !!(router.state.location.search as any).fromPush;

  const hostname = window?.location.origin;

  const handleLinkCopy = () => {
    copyTextToClipboard(`${hostname}/w/${wallet.privateKey}`);
    toast({
      title: `Push link copied. Share it with the recipient!`,
      status: "info",
    });
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
                The recipient will get access to the funds via the link
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
                <TransferTokens
                  to={wallet.address}
                  onSuccess={(tx) => {
                    toast({
                      title: `${formatEther(tx.value)} ETH sent. Tx: ${tx.hash}.`,
                      status: "success",
                    });
                  }}
                  label="Deposit"
                  onError={(e) => toast({ title: e.message, status: "error" })}
                />
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
          {/*<Box bg="white" w="370px" maxWidth="100%" p={4} borderRadius="lg" boxShadow="md">*/}
          <Stack direction="row" justify="center" align="center" gap={3}>
            <Button
              rightIcon={<AiOutlineLink />}
              onClick={handleLinkCopy}
              variant="outline"
              colorScheme="pink"
            >
              {fromPush ? "Copy link" : "Share"}
            </Button>
            {!fromPush && (
              <Button
                rightIcon={<AiOutlineQrcode />}
                onClick={onOpen}
                variant="outline"
                colorScheme="pink"
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
                  params: { privateKey: wallet.privateKey },
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
          qrValue={`${hostname}/w/${wallet.privateKey}`}
          title={"QR link to Push"}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Container>
    </Container>
  );
};
