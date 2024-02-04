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
import { useWeb3ModalTheme } from "@web3modal/ethers/react";
import { useEffect } from "react";
import { HeaderWalletConnect } from "./header-wallet-connect";
import { useNavigate } from "@tanstack/react-router";

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

  @media (max-width: 600px) {
    padding: 0 0 0 10px;
  }
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

  .logo {
    -webkit-user-drag: none;
    user-select: none;
  }

  &:hover {
    .logo {
      filter: brightness(70%);
    }
  }
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
  const [showSomeActions] = useMediaQuery("(min-width: 600px)");

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
                  <div>BlastPush</div>
                  {/* <Image className="logo" src={LogoImage} /> */}
                  <ChevronDownIcon
                    width="24px"
                    height="24px"
                    color="gray.500"
                  />
                </Stack>
              </MenuButton>
              <MenuList>
                <Link onClick={() => navigate({ to: "/" })}>
                  <MenuItem>Create new push</MenuItem>
                </Link>
                <Link href={"/faq"}>
                  <MenuItem>FAQ</MenuItem>
                </Link>
                <a
                  href={"https://twitter.com/solpushcom"}
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
            </Menu>
          </LogoImageWrapper>
        </Logo>
        <Actions>
          {showSomeActions && (
            <Link href={"/faq"}>
              <Button variant="outline" mr={1}>
                FAQ
              </Button>
            </Link>
          )}
          <ColorMode />
          <$HeaderWalletConnect />
        </Actions>
      </Container>
      <FakeHeader />
    </>
  );
};
