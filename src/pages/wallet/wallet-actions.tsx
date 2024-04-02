import { Icon, Stack, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "@tanstack/react-router";
import { FaKey, FaTags } from "react-icons/fa";
import { usePushWalletContext } from "../../providers/push-wallet-provider";
import { ActionCard } from "./action-card";
import { ExportWalletModal } from "./export-wallet-modal";

interface PushWalletActionsProps {
  className?: string;
}

const Container = styled.div``;

export const WalletActions = ({
  className,
}: PushWalletActionsProps): JSX.Element => {
  const { account: wallet } = usePushWalletContext();
  const router = useRouter();
  const {
    isOpen: isExport,
    onClose: onExportClose,
    onOpen: openExport,
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
                search: { fromPush: true },
              });
            }}
            label="Deposit"
          >
            <Icon width="20px" height="20px" as={FaTags} />
          </ActionCard>
          <ActionCard onClick={openExport} label="Export">
            <Icon width="18px" height="18px" as={FaKey} />
          </ActionCard>
        </Stack>
      </Stack>
      <ExportWalletModal isOpen={isExport} onClose={onExportClose} />
    </Container>
  );
};
