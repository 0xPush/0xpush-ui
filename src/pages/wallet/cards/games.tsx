import { Button, Heading, Stack, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";

import BurgerCitiesLogo from "assets/projects/burger-cities.ico";
import CtyptoValleysLogo from "assets/projects/crypto-valleys.ico";
import XhuntLogo from "assets/projects/xhunt.png";

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

export const Games = ({ className }: EarnProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <Container className={className}>
      <Stack mt={2} align="center" />
      {/* </Stack> */}
      {/* Monoswap */}
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            <Image src={XhuntLogo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">xHUNT</Heading>
            </Row>
            {/* <Tag colorScheme="purple" mt={1} size="sm">
              DEX
            </Tag> */}
          </Column>
        </Row>
        <Row>
          <a
            href="https://www.xhunt.tech/"
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
            <Image src={CtyptoValleysLogo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Crypto Valleys</Heading>
            </Row>
          </Column>
        </Row>
        <Row>
          <a
            href="https://cryptovalleys.io/"
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
            <Image src={BurgerCitiesLogo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Burger Cities</Heading>
            </Row>
          </Column>
        </Row>
        <Row>
          <a
            href="https://burgercities.org/"
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
