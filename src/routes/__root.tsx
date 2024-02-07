import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Content } from "../components/layout/content";
import { Header } from "../components/layout/header";
import { PriceProvider } from "../providers/price-provider";
import { Web3ModalProvider } from "../providers/web3-modal-provider";
import { theme } from "../theme";

const AppContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-flow: column nowrap;
`;

const manager = createLocalStorageManager("color-theme");

export const Route = createRootRoute({
  component: () => (
    <Web3ModalProvider>
      <ChakraProvider
        theme={theme}
        colorModeManager={manager}
        toastOptions={{
          defaultOptions: { isClosable: true, position: "bottom-right" },
        }}
      >
        <PriceProvider>
          <AppContainer>
            <Header />
            <Content>
              <Outlet />
            </Content>
          </AppContainer>
        </PriceProvider>
      </ChakraProvider>
      <Suspense>{/* <TanStackRouterDevtools /> */}</Suspense>
    </Web3ModalProvider>
  ),
});
