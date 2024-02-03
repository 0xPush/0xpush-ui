import styled from "@emotion/styled";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useNavigate } from "@tanstack/react-router";

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
    console.log(newWallet);

    navigate({
      to: "/w/$privateKey/deposit",
      params: { privateKey: newWallet.privateKey },
    });
  };

  return (
    <Container className={className}>
      <Button onClick={handleCreate}>Create wallet</Button>
    </Container>
  );
};
