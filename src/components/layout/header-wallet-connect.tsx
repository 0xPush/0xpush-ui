import { Button, useMediaQuery } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { blastTestnet } from "../../providers/web3-modal-provider";
import { shortString } from "../../lib/string";
import { FaWallet } from "react-icons/fa";

const Container = styled.div`
  display: flex;
`;

interface Props {
  className?: string;
  onClick?: () => void;
}

export const HeaderWalletConnect = ({
  className,
  onClick,
}: Props): JSX.Element => {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Container className={className} onClick={onClick}>
      {!isConnected && (
        <Button
          flex={isMobile ? 1 : undefined}
          rightIcon={<FaWallet fill="gray" />}
          variant="outline"
          onClick={() => open()}
        >
          Connect wallet
        </Button>
      )}
      {isConnected && chainId !== blastTestnet.chainId && (
        <Button
          flex={isMobile ? 1 : undefined}
          rightIcon={<FaWallet />}
          variant="outline"
          onClick={() => open({ view: "Networks" })}
        >
          Wrong network
        </Button>
      )}
      {isConnected && chainId === blastTestnet.chainId && (
        <Button
          flex={isMobile ? 1 : undefined}
          variant="outline"
          onClick={() => open({ view: "Account" })}
        >
          {shortString(address as string)}
        </Button>
      )}
    </Container>
  );
};
