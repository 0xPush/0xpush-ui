import { Button, useMediaQuery } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { shortString } from "../../lib/string";
import { FaWallet } from "react-icons/fa";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

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
  const { address, chainId, isConnected } = useAccount();
  const isWrongNetwork = false;

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
