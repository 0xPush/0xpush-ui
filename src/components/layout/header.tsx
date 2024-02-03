import styled from "@emotion/styled";
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

import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

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

  .wallet-adapter-button {
    transform: scale(0.8);
    transition: background-color 0.2s;
    border-radius: var(--chakra-radii-md);
  }

  .wallet-adapter-button-start-icon {
    display: none;
  }

  .wallet-adapter-button-trigger {
    background: unset;
    border: 1px solid var(--chakra-colors-pink-500);
    color: var(--chakra-colors-pink-500);
    padding: 0 10px 0 12px;
  }

  .wallet-adapter-button:not([disabled]):hover {
    background: var(--chakra-colors-pink-100);
  }
`;

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

  return (
    <>
      <Container bg={bgColor[colorMode]}>
        <Logo>
          <LogoImageWrapper>
            <Menu>
              <MenuButton as="div">
                <Stack direction="row">
                  <h1>BlastPush</h1>
                  {/* <Image className="logo" src={LogoImage} /> */}
                  <ChevronDownIcon
                    width="24px"
                    height="24px"
                    color="gray.500"
                  />
                </Stack>
              </MenuButton>
              <MenuList>
                <Link href={"/"}>
                  <MenuItem>Create new push</MenuItem>
                </Link>
                <Link href={"/faq"}>
                  <MenuItem>FAQ</MenuItem>
                </Link>
                <Link href={"/api-docs"}>
                  <MenuItem>API</MenuItem>
                </Link>
                <a
                  href={"https://twitter.com/solpushcom"}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MenuItem>
                    {/* Twitter <Icon ml={2} as={FaTwitter} /> */}
                  </MenuItem>
                </a>
                <a
                  href={"https://t.me/solanapush"}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MenuItem>
                    {/* Telegram <Icon ml={2} as={FaTelegramPlane} /> */}
                  </MenuItem>
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
          {/* <WalletMultiButton /> */}
        </Actions>
      </Container>
      <FakeHeader />
    </>
  );
};
