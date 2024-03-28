import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ReactNode } from "react";

const Container = styled.div`
  position: relative;
  z-index: 1;
`;

const Blur = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(4px) grayscale(30%) sepia(20%);
  z-index: 2;
`;

const Content = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 3;

  .wallet-adapter-button {
    transition: background-color 0.2s;
  }

  .wallet-adapter-button-start-icon {
    display: none;
  }

  .wallet-adapter-button-trigger {
    background: var(--chakra-colors-purple-500);
    color: #fff;
  }

  .wallet-adapter-button:not([disabled]):hover {
    background: var(--chakra-colors-purple-600);
  }
`;

interface ConnectWalletBlurProps {
  children: ReactNode;
  className?: string;
}

export const ConnectWalletBlur = ({
  className,
  children,
}: ConnectWalletBlurProps): JSX.Element => {
  const { open } = useWeb3Modal();
  const {} = useWeb3ModalState();

  return (
    <Container className={className}>
      {!isConnected && (
        <Content>
          <Button onClick={() => open()}>Connect wallet</Button>
        </Content>
      )}
      {!isConnected && <Blur />}
      {isConnected && (
        <>
          <Blur />
          <Content>
            <Button
              variant="outline"
              onClick={() => open({ view: "Networks" })}
            >
              Wrong network
            </Button>
          </Content>
        </>
      )}
      {children}
    </Container>
  );
};
