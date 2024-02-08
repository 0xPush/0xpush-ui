import {
  Box,
  Divider,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
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
            Create a new Push (with or without the specified settings), send ETH
            to it's address. Then just share the Push link with the recipient.
            <br />
            <br />
            The recipient will be able to claim crypto via the link.
          </Text>
          <Divider />
          <Heading size="sm">It is secure?</Heading>
          <Text>
            A Push link is access to funds. Share it only with the recipient of
            the funds. The hash of the link contains a private key. This
            application is a thin client, the private key is not stored anywhere
            in any form (except browser), and is used only on the client side.
            <br />
            <br />
            Customization data is stored on-chain and applied only by public
            key.
          </Text>
          <Divider />
          <Heading size="sm">I lost the Push link. What to do?</Heading>
          <Text>
            If you haven't saved the link, try to find it in your browser
            history.
            <br />
            <br />
            We do not have access to private keys.
          </Text>
        </$Box>
      </Stack>
    </Container>
  );
};
