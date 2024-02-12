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
  font-size: 2.5rem !important;
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

export const Points = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <Container>
      <Stack justify="center" align="center" mb={10}>
        <HeadingBlock>
          <$Heading textAlign="center">Points are coming soon 🚀</$Heading>
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
          <Heading size="sm">How to earn points?</Heading>
          <Text>
            Share pushes. Use customizations. Do quests.
            <br />
            The program is designed to be sybil-resistant - rewarding real users
            and real activity.
          </Text>
          <Divider />
          <Heading size="sm">Can I send without customization?</Heading>
          <Text>No. On-chain activity is needed to earn points.</Text>
          <Divider />
          <Heading size="sm">When will the points be distributed?</Heading>
          <Text>
            Distribution will start some time after the mainnet launch.
            <br />
            We will inform you about this in the announcements. <br />
            The previous activity can be accounted for.
          </Text>
          <Divider />
          <Heading size="sm">What is the utility of the points?</Heading>
          <UnorderedList>
            <ListItem>Access to new features</ListItem>
            <ListItem>Claiming a share of the users gas fee</ListItem>
            <ListItem>Early adopters NFTs</ListItem>
            <ListItem>Blast dev-points distribution</ListItem>
            <ListItem>Token distribution</ListItem>
          </UnorderedList>

          <Text mt={4}>Criteria and rules can be changed</Text>
        </$Box>
      </Stack>
    </Container>
  );
};
