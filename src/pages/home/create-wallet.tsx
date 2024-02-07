import styled from "@emotion/styled";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useNavigate } from "@tanstack/react-router";
import { PushHistory } from "../../lib/history";

const Container = styled.div`
  display: flex;
`;

interface Props {
  className?: string;
}

export const CreateWallet = ({ className }: Props): JSX.Element => {
  const navigate = useNavigate();
  const handleCreate = () => {
    const newWallet = ethers.Wallet.createRandom();

    PushHistory.addToHistory({
      secret: newWallet.privateKey,
      type: "created",
      date: new Date(),
    });

    navigate({
      to: "/w/$privateKey/deposit",
      params: { privateKey: newWallet.privateKey },
    });
  };

  return (
    <Container className={className}>
      <Button
        variant="solid"
        colorScheme="yellow"
        size="lg"
        onClick={handleCreate}
      >
        Create push
      </Button>
    </Container>
  );
};
