import styled from "@emotion/styled";
import {
  Button,
  Heading,
  Stack,
  Tag,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

import MonoswapLogo from "assets/projects/monoswap.png";
import EasyxLogo from "assets/projects/easyx.png";
import BlastLogo from "assets/projects/blast.png";

import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Column, Item, LogoContainer, Row } from "./list-components";

interface EarnProps {
  className?: string;
}

const Container = styled.div``;

const Image = styled.img`
  width: 42px;
  height: 42px;
  -webkit-user-drag: none;
`;

export const Earn = ({ className }: EarnProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <Container className={className}>
      <Stack mt={2} mb={6} align="center">
        <Tag px={3} py={1.5} colorScheme="purple" borderRadius="xl">
          Provide crypto and earn
        </Tag>
      </Stack>
      {/* Monoswap */}
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            <Image src={MonoswapLogo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Monoswap</Heading>
              <Tooltip
                label={
                  "You may provide liquidity to a trading pool to earn a share of trading fees"
                }
              >
                <QuestionOutlineIcon ml="6px" />
              </Tooltip>
            </Row>
            <Tag colorScheme="purple" mt={1} size="sm">
              DEX
            </Tag>
          </Column>
        </Row>
        <Row>
          <a
            href="https://www.monoswap.io/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button size="sm" variant="solid">
              Visit
            </Button>
          </a>
        </Row>
      </Item>
      {/* EasyXTrade */}
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            <Image src={EasyxLogo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">EasyX</Heading>
            </Row>
            <Tag colorScheme="purple" mt={1} size="sm">
              PERP DEX
            </Tag>
          </Column>
        </Row>
        <Row>
          <a
            href="https://easyx.trade/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button size="sm" variant="solid">
              Visit
            </Button>
          </a>
        </Row>
      </Item>
      {/* Blastoff */}
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            <Image src={BlastLogo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Blast Off</Heading>
            </Row>
            <Tag colorScheme="purple" mt={1} size="sm">
              LAUNCHPAD
            </Tag>
          </Column>
        </Row>
        <Row>
          <a
            href="https://blastoff.zone/"
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
