import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react';
import styled from '@emotion/styled';


import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Content } from './components/layout/content';
import { Header } from './components/layout/header';
import { PriceProvider } from './providers/price-provider';
import { routeTree } from './routeTree.gen';
import { theme } from './theme';

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const AppContainer = styled.div`
    min-height: 100dvh;
    display: flex;
    flex-flow: column nowrap;
`;

const manager = createLocalStorageManager('color-theme');


export const App = () => {
  return (
    <ChakraProvider theme={theme} colorModeManager={manager}>
      <PriceProvider>
        <AppContainer>
          <Header />
          <Content>
            <RouterProvider router={router} />
          </Content>
        </AppContainer>
      </PriceProvider>
    </ChakraProvider>
  )
}

export default App
