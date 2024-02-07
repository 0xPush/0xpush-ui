import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { Web3ModalProvider } from "../providers/web3-modal-provider";
import { theme } from "../theme";
import { PriceProvider } from "../providers/price-provider";
import { Header } from "../components/layout/header";
import { Content } from "../components/layout/content";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

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
