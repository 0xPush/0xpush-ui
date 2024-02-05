import React, { useState } from "react";
import styled from "@emotion/styled";
import { Icon, Stack, useDisclosure } from "@chakra-ui/react";
import { FaKey, FaRetweet, FaTags } from "react-icons/fa";
import { useInnerWalletContext } from "../../providers/inner-wallet-provider";
import { useRouter } from "@tanstack/react-router";
import { ActionCard } from "./action-card";

interface PushWalletActionsProps {
  className?: string;
}

const Container = styled.div``;

type ActionType = "deposit" | "export" | "recreate" | null;

export const WalletActions = ({
  className,
}: PushWalletActionsProps): JSX.Element => {
  const { wallet } = useInnerWalletContext();
  const router = useRouter();
  const [action, setAction] = useState<ActionType>(null);
  const {
    isOpen: isExport,
    onClose: onExportClose,
    onOpen: openExport,
  } = useDisclosure();
  const {
    isOpen: isRecreate,
    onClose: onRecreateClose,
    onOpen: openRecreate,
  } = useDisclosure();

  return (
    <Container className={className}>
      <Stack align="center">
        <Stack width={370} direction="row" spacing={4} mb={2}>
          <ActionCard
            onClick={() => {
              router.navigate({
                to: "/w/$privateKey/deposit",
                params: { privateKey: wallet.privateKey },
              });
            }}
            active={action === "deposit"}
            label="Deposit"
          >
            <Icon width="20px" height="20px" as={FaTags} />
          </ActionCard>
          <ActionCard
            onClick={openRecreate}
            active={action === "recreate"}
            label="Recreate"
          >
            <Icon width="22px" height="22px" as={FaRetweet} />
          </ActionCard>
          <ActionCard
            onClick={openExport}
            active={action === "export"}
            label="Export"
          >
            <Icon width="18px" height="18px" as={FaKey} />
          </ActionCard>
        </Stack>
      </Stack>
    </Container>
  );
};
