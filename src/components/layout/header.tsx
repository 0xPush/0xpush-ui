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

import { useWeb3ModalTheme } from "@web3modal/ethers/react";
import { useEffect } from "react";
import { HeaderWalletConnect } from "./header-wallet-connect";
import { useNavigate } from "@tanstack/react-router";
import { HeaderDrawer } from "./header-drawer";

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
  width: 130px;
  transition: all 0.2s;
  position: relative;
`;

const LogoLabel = styled.h4`
  font-family: Geomgraphic;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
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
                  <LogoLabel>BlastPush</LogoLabel>
                  {!isMobile && (
                    <ChevronDownIcon
                      width="24px"
                      height="24px"
                      color="gray.500"
                    />
                  )}
                </Stack>
              </MenuButton>
              {!isMobile && (
                <MenuList>
                  <a onClick={() => navigate({ to: "/" })}>
                    <MenuItem>Create Push</MenuItem>
                  </a>
                  <a onClick={() => navigate({ to: "/faq" })}>
                    <MenuItem>FAQ</MenuItem>
                  </a>
                  <a
                    href={"https://twitter.com/blast_push"}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <MenuItem>Twitter</MenuItem>
                  </a>
                  <a
                    href={"https://t.me/blastpush"}
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
              <Link onClick={() => navigate({ to: "/points" })}>
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
              </Link>
              <Link onClick={() => navigate({ to: "/faq" })}>
                <Button variant="outline" mr={3}>
                  FAQ
                </Button>
              </Link>
            </>
          )}
          <ColorMode />
          {!isMobile && <$HeaderWalletConnect />}
          {isMobile && <HeaderDrawer />}
        </Actions>
      </Container>
      <FakeHeader />
    </>
  );
};
