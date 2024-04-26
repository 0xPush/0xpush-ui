import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Content } from "../components/layout/content";
import { Header } from "../components/layout/header";
import { PriceProvider } from "../providers/price-provider";
import { theme } from "../theme";
import { WagmiWeb3Provider } from "providers/wagmi-web3-provider";
import { GoldRushProvider } from "@covalenthq/goldrush-kit";

import "@covalenthq/goldrush-kit/styles.css";

const AppContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
`;

const manager = createLocalStorageManager("color-theme");

const COVALENT_API_KEY = "cqt_rQbjWy6kQ8dWHCYkV74KY4VYD893";

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
          <GoldRushProvider apikey={COVALENT_API_KEY}>
            <AppContainer>
              <Header />
              <Content>
                <Outlet />
              </Content>
            </AppContainer>
          </GoldRushProvider>
        </PriceProvider>
      </WagmiWeb3Provider>
    </ChakraProvider>
  ),
});
