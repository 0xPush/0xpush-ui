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
import { ChevronLeftIcon, LinkIcon } from "@chakra-ui/icons";
import { PublicKey } from "../../components/public-key";
import { QrModal } from "../../components/qr-modal";
import { copyTextToClipboard } from "../../lib/copy";
import { Balance } from "../../components/balance/balance";
import { ConnectWalletBlur } from "../../components/balance/connect-wallet-blur";
import { TransferTokens } from "../../components/transfer-tokens";

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
  const { wallet, updateBalance } = useInnerWalletContext();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  const router = useRouter();

  const fromPush = false;

  const hostname = window?.location.origin;

  const handleLinkCopy = () => {
    copyTextToClipboard(`${hostname}/w/${wallet.privateKey}`);
    toast({ title: `Push link copied. Share it with the recipient!` });
  };

  return (
    <Container className={className}>
      <Container>
        <Fade in={true}>
          <Stack justify="center" align="center" mb={2} mx={2}>
            <$Heading size="lg" textAlign="center">
              {fromPush ? "Deposit" : "Deposit and share"}
            </$Heading>
            {!fromPush && (
              <Text mb={4} textAlign="center">
                The recipient will get access to the funds via the link
              </Text>
            )}
            {fromPush && (
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
                  onSuccess={() => {
                    toast({ title: "Success deposit", colorScheme: "green" });
                    updateBalance();
                  }}
                  onError={(e) =>
                    toast({ title: e.message, colorScheme: "green" })
                  }
                />
              </Box>
            </ConnectWalletBlur>
          </Fade>
        </Stack>
        {!fromPush && (
          <Stack mt={5} mb={10} justify="center" align="center">
            {/*<Box bg="white" w="370px" maxWidth="100%" p={4} borderRadius="lg" boxShadow="md">*/}
            <Stack justify="center" align="center">
              <Button
                rightIcon={<LinkIcon />}
                onClick={handleLinkCopy}
                variant="outline"
                colorScheme="pink"
              >
                Share Push
              </Button>
            </Stack>
            <Stack justify="center" align="center">
              <Button
                mt={2}
                size="sm"
                onClick={onOpen}
                variant="outline"
                colorScheme="pink"
              >
                Share QR
              </Button>
            </Stack>
            {/*</Box>*/}
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
