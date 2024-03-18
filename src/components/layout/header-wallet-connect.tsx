import { Button, useMediaQuery } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { shortString } from "../../lib/string";
import { FaWallet } from "react-icons/fa";
import { blastMainnet, blastTestnet } from "providers/chain-provider";

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
  const isWrongNetwork = isConnected && chainId !== blastMainnet.chainId;

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
      {isConnected && (
        <Button
          flex={isMobile ? 1 : undefined}
          {...(!isWrongNetwork && { rightIcon: <FaWallet fill="gray" /> })}
          variant="outline"
          onClick={() => open()}
        >
          {isWrongNetwork ? "Wrong network" : shortString(address as string)}
        </Button>
      )}
    </Container>
  );
};
