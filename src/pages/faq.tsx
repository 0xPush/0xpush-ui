import {
  Box,
  Divider,
  Fade,
  Heading,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { moveBg } from "components/moveBg";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  margin-top: 4vh;
  z-index: 1;
`;

const HeadingBlock = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const $Heading = styled(Heading)`
  font-size: 2rem !important;
  ${moveBg};

  @media screen and (max-width: 600px) {
    font-size: 1.5rem !important;
  }
`;

const $Box = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 16px;
`;

export const Faq = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <Container>
      <Fade in={true}>
        <Stack justify="center" align="center" mb={10}>
          <HeadingBlock>
            <$Heading textAlign="center">Frequently Asked Questions</$Heading>
          </HeadingBlock>
        </Stack>
        <Stack justify="center" align="center">
          <$Box
            flex={1}
            bg={bgColor[colorMode]}
            width="100%"
            maxWidth="700px"
            borderRadius="lg"
            boxShadow="sm"
            p={5}
          >
            <Heading size="sm">How it works?</Heading>
            <Text>
              Create a new Push (with or without the specified settings), send
              ETH or other assets to this address. Then just share the Push link
              with the recipient.
              <br />
              <br />
              The recipient will be able to claim crypto via the link.
            </Text>
            <Divider />
            <Heading size="sm">Is it secure?</Heading>
            <Text>
              A Push link gives access to assets. Share it only with the
              recipient. The hash of the link contains a private key. This
              application is a thin client and the private key is not stored
              anywhere in any form (except your browser), and is used only on
              the client side.
              <br />
              <br />
              Customization data is stored on-chain and applied only by public
              key.
            </Text>
            <Divider />
            <Heading size="sm">
              I have lost the Push link. What do I do?
            </Heading>
            <Text>
              If you haven't saved the link, try look it up in your browser
              history.
              <br />
              We don't have access to private keys.
            </Text>
            <Divider />
            <Heading size="sm">Contract addresses?</Heading>
            <Text>
              Scroll mainnet:{" "}
              <Link
                href="https://scrollscan.com/address/0x0f36EA243A33A4Ede08CDEaB94F46530Fb13d480"
                target="_blank"
              >
                0x0f36EA243A33A4Ede08CDEaB94F46530Fb13d480
              </Link>
            </Text>
            <Divider />
            <Heading size="sm">
              Can I send USDT, USDC, NFT or other tokens?
            </Heading>
            <Text>All known tokens will be added soon.</Text>
          </$Box>
        </Stack>
      </Fade>
    </Container>
  );
};
