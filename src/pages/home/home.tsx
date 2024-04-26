import {
  Button,
  Fade,
  Heading,
  Link,
  ScaleFade,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaTelegram } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { moveBg } from "../../components/moveBg";
import { CreateWallet } from "./create-wallet";
import { HomeCards } from "./home-cards";

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

const Banner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const ScrollImage = styled.img`
  user-select: none;
  -webkit-user-drag: none;
  width: 140px;
`;

export const Home = (): JSX.Element => {
  const { colorMode } = useColorMode();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

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
          <$Heading textAlign="center">&nbsp;on Scroll</$Heading>
        </HeadingBlock>
      </Stack>
      <Stack justify="center" align="center">
        <ScaleFade in={true}>
          <CreateWallet />
        </ScaleFade>
      </Stack>
      <Stack mt={20} mb={8} justify="center" align="center">
        <ScaleFade in={true}>
          <HomeCards />
        </ScaleFade>
      </Stack>

      <ScaleFade in={show}>
        <Stack mt={20} mb={20}>
          <Banner>
            <Heading size="mm">Built on</Heading>
            <a
              href="https://scroll.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ScrollImage
                alt="scroll"
                src={
                  colorMode === "light"
                    ? "/scroll-white.png"
                    : "/scroll-dark.png"
                }
              />
            </a>
          </Banner>
        </Stack>
      </ScaleFade>

      <Fade in={true}>
        <Stack spacing="12px" direction="row" justify="center" align="center">
          {/* <Button
            leftIcon={<FaTwitter />}
            as={Link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </Button> */}
          <Button
            leftIcon={<FaTelegram />}
            as={Link}
            href="https://t.me/zeroxpush"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </Button>
          {/* <Button
            leftIcon={<FaDiscord />}
            as={Link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </Button> */}
        </Stack>
      </Fade>
    </Container>
  );
};
