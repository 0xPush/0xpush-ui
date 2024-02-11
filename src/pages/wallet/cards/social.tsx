import { Button, Heading, Stack, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";

import AtticcLogo from "assets/projects/atticc.png";
import Upto3Logo from "assets/projects/upto3.ico";

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

export const Social = ({ className }: EarnProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "whiteAlpha.100" };

  return (
    <Container className={className}>
      <Stack mt={2} align="center" />
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            <Image src={AtticcLogo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Atticc</Heading>
            </Row>
          </Column>
        </Row>
        <Row>
          <a
            href="https://atticc.xyz/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button size="sm" variant="solid">
              Visit
            </Button>
          </a>
        </Row>
      </Item>
      <Item bg={bgColor[colorMode]} borderRadius="lg" boxShadow="md">
        <Row>
          <LogoContainer>
            <Image src={Upto3Logo} />
          </LogoContainer>
          <Column>
            <Row>
              <Heading fontSize="md">Upto3</Heading>
            </Row>
          </Column>
        </Row>
        <Row>
          <a
            href="https://www.upto3.xyz/"
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
