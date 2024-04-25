import {
  Button,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaRegStar } from "react-icons/fa";

import { useEffect } from "react";
import { HeaderWalletConnect } from "./header-wallet-connect";
import { useNavigate } from "@tanstack/react-router";
import { HeaderDrawer } from "./header-drawer";
import { moveBg } from "components/moveBg";
import { useWeb3ModalTheme } from "@web3modal/wagmi/react";

const Container = styled.header<{ bg: string }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: 0 20px;
  background: ${(p) => p.bg};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: saturate(180%) blur(4px);
  z-index: 2;
`;

const FakeHeader = styled.div`
  margin-bottom: 72px;
`;

const Logo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const LogoImageWrapper = styled.div`
  transition: all 0.2s;
  position: relative;
`;

const LogoLabel = styled.h4<{ isDark?: boolean }>`
  font-family: Sora;
  font-weight: 700;
  letter-spacing: -0.3px;
  font-size: 22px;
  line-height: 20px;
  padding: 0 5px;
  ${moveBg};
`;

const Actions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 4px;
`;

const $HeaderWalletConnect = styled(HeaderWalletConnect)``;

function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label="Switch color theme">
      <IconButton
        variant="outline"
        onClick={toggleColorMode}
        aria-label={"Toggle theme"}
        size="md"
        icon={
          colorMode === "light" ? <MoonIcon color="gray.500" /> : <SunIcon />
        }
      />
    </Tooltip>
  );
}

export const Header = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "rgba(255, 255, 255, 0.5)", dark: "transparent" };
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();

  const { setThemeMode } = useWeb3ModalTheme();

  useEffect(() => {
    setThemeMode(colorMode);
  }, [colorMode, setThemeMode]);

  return (
    <>
      <Container bg={bgColor[colorMode]}>
        <Logo>
          <LogoImageWrapper>
            <Menu>
              <MenuButton as="div">
                <Stack direction="row">
                  <LogoLabel isDark={colorMode === "dark"}>0xPush</LogoLabel>
                  {!isMobile && (
                    <ChevronDownIcon
                      width="24px"
                      height="24px"
                      color="gray.500"
                      ml={-2}
                      mt={0}
                    />
                  )}
                </Stack>
              </MenuButton>
              {!isMobile && (
                <MenuList>
                  <a onClick={() => navigate({ to: "/" })}>
                    <MenuItem>Home</MenuItem>
                  </a>
                  <a onClick={() => navigate({ to: "/faq" })}>
                    <MenuItem>FAQ</MenuItem>
                  </a>
                  {/* <a
                    href={"https://twitter.com/0xpush"}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <MenuItem>Twitter</MenuItem>
                  </a> */}
                  <a
                    href={"https://t.me/zeroxpush"}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <MenuItem>Telegram</MenuItem>
                  </a>
                </MenuList>
              )}
            </Menu>
          </LogoImageWrapper>
        </Logo>
        <Actions>
          {!isMobile && (
            <>
              {/* <Link
                className="onboard-points"
                onClick={() => navigate({ to: "/points" })}
              >
                <Button
                  variant="outline"
                  mr={0}
                  _hover={{
                    bg: { light: "orange.100", dark: "orange.900" }[colorMode],
                  }}
                  rightIcon={
                    <FaRegStar
                      fill={{ light: "#cf5300", dark: "orange" }[colorMode]}
                    />
                  }
                >
                  Points
                </Button>
              </Link> */}
              <Link onClick={() => navigate({ to: "/faq" })}>
                <Button variant="outline" mr={3}>
                  FAQ
                </Button>
              </Link>
            </>
          )}
          <ColorMode />
          {!isMobile && (
            <$HeaderWalletConnect className="onboard-wallet-connect" />
          )}
          {isMobile && <HeaderDrawer />}
        </Actions>
      </Container>
      <FakeHeader />
    </>
  );
};
