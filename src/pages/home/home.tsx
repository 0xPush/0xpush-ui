import React from "react";
import styled from "@emotion/styled";
import { moveBg } from "../../components/moveBg";
import { Fade, Heading, Stack } from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import { CreateWallet } from "./create-wallet";

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

const TypewriterContainer = styled.span`
  margin-left: 10px;
  padding: 4px 0 4px 10px;
  border-radius: 10px;
  background: rgba(255, 128, 0, 0.15);

  .Typewriter__cursor {
    opacity: 0;
    font-size: 20px;
    visibility: hidden;
  }

  .Typewriter__wrapper {
    padding: 0;
  }

  @media screen and (max-width: 600px) {
    padding: 1px 0 1px 4px;
    border-radius: 6px;

    .Typewriter__cursor {
      font-size: 10px;
    }
  }
`;

interface Props {
  className?: string;
}

export const Home = ({ className }: Props): JSX.Element => {
  return (
    <Container>
      <Stack justify="center" align="center" mb={10}>
        <HeadingBlock>
          <$Heading textAlign="center">Share </$Heading>
          <TypewriterContainer>
            <$Heading>
              <Typewriter
                options={{
                  strings: ["Ether", "USD", "NFT", "Crypto", "Tips"],
                  autoStart: true,
                  loop: true,
                  // @ts-expect-error
                  pauseFor: 3000,
                }}
              />
            </$Heading>
          </TypewriterContainer>
          <$Heading textAlign="center">&nbsp;in Blast L2</$Heading>
        </HeadingBlock>
        <$Heading mb={5} textAlign="center">
          with native yield
        </$Heading>
      </Stack>
      <Stack justify="center" align="center">
        <Fade in={true}>
          <CreateWallet />
        </Fade>
      </Stack>
    </Container>
  );
};
