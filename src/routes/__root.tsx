import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Content } from "../components/layout/content";
import { Header } from "../components/layout/header";
import { PriceProvider } from "../providers/price-provider";
import { theme } from "../theme";
import { WagmiWeb3Provider } from "providers/wagmi-web3-provider";

const AppContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
`;

const manager = createLocalStorageManager("color-theme");

export const Route = createRootRoute({
  component: () => (
    <ChakraProvider
      theme={theme}
      colorModeManager={manager}
      toastOptions={{
        defaultOptions: { isClosable: true, position: "bottom-right" },
      }}
    >
      <WagmiWeb3Provider>
        <PriceProvider>
          <AppContainer>
            <Header />
            <Content>
              <Outlet />
            </Content>
          </AppContainer>
        </PriceProvider>
      </WagmiWeb3Provider>
    </ChakraProvider>
  ),
});
