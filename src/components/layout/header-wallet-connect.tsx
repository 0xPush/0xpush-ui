import { LinkIcon } from "@chakra-ui/icons";
import { Button, useColorMode, useMediaQuery } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useWeb3ModalState,
} from "@web3modal/ethers/react";
import { blastTestnet } from "../../providers/web3-modal-provider";

const Container = styled.div`
  display: flex;
`;

interface Props {
  className?: string;
}

export const HeaderWalletConnect = ({ className }: Props): JSX.Element => {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  return (
    <Container className={className}>
      {!isConnected && (
        <Button
          rightIcon={<LinkIcon />}
          variant="outline"
          onClick={() => open()}
        >
          Connect wallet
        </Button>
      )}
      {isConnected && chainId !== blastTestnet.chainId && (
        <Button
          rightIcon={<LinkIcon />}
          variant="outline"
          onClick={() => open({ view: "Networks" })}
        >
          Wrong network
        </Button>
      )}
      {isConnected && chainId === blastTestnet.chainId && (
        <w3m-button size="sm" />
      )}
    </Container>
  );
};
