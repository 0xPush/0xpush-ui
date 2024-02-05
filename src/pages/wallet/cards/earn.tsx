import styled from "@emotion/styled";
import {
  Button,
  Collapse,
  Heading,
  Stack,
  Tag,
  Tooltip,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Column, Item, LogoContainer, Percent, Row } from "./list-components";

interface EarnProps {
  className?: string;
}

const Container = styled.div``;

export const Earn = ({ className }: EarnProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <Container className={className}>
      <Stack mt={2} mb={6} align="center">
        <Tag px={3} py={1.5} colorScheme="purple" borderRadius="xl">
          Provide funds and earn
        </Tag>
      </Stack>

      <Stack my={0}>
        {/*<Divider borderColor={colorMode === 'light' ? '#ccc' : '#565656'} />*/}
      </Stack>
      {/* RAYDIUM */}
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            {/* <Image
              height={42}
              width={42}
              layout="intrinsic"
              src={RaydiumLogo}
              alt="raydium"
            /> */}
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Raydium</Heading>
              <Tooltip
                label={
                  "You may provide liquidity to a trading pool to earn a share of trading fees"
                }
              >
                <QuestionOutlineIcon ml="6px" />
              </Tooltip>
            </Row>
            <Tag colorScheme="purple" mt={1} size="sm">
              DEFI
            </Tag>
          </Column>
        </Row>
        <Row>
          <Percent>~14% APR</Percent>
          <a
            href="https://raydium.io/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button size="sm" variant="solid">
              Visit
            </Button>
          </a>
        </Row>
      </Item>
      {/* Solend */}
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            {/* <Image
              height={42}
              width={42}
              layout="intrinsic"
              src={SolendLogo}
              alt="solend"
            /> */}
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Solend</Heading>
              <Tooltip
                label={"Solend is the bank of the future, for everyone."}
              >
                <QuestionOutlineIcon ml="6px" />
              </Tooltip>
            </Row>
            <Tag colorScheme="purple" mt={1} size="sm">
              LENDING
            </Tag>
          </Column>
        </Row>
        <Row>
          <a href="https://solend.fi" target="_blank" rel="noreferrer noopener">
            <Button size="sm" variant="solid">
              Visit
            </Button>
          </a>
        </Row>
      </Item>
      {/* SABER */}
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            {/* <Image
              height={42}
              width={42}
              layout="intrinsic"
              src={SaberLogo}
              alt="saber"
            /> */}
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Saber</Heading>
              <Tooltip
                label={
                  "You may provide liquidity to a trading pool to earn a share of trading fees"
                }
              >
                <QuestionOutlineIcon ml="6px" />
              </Tooltip>
            </Row>
            <Tag colorScheme="purple" mt={1} size="sm">
              DEFI
            </Tag>
          </Column>
        </Row>
        <Row>
          <a
            href="https://app.saber.so/farms"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button size="sm" variant="solid">
              Visit
            </Button>
          </a>
        </Row>
      </Item>
    </Container>
  );
};
