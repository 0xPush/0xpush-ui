import {
  Button,
  Fade,
  Heading,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import type { FireworksHandlers } from "@fireworks-js/react";
import { Fireworks } from "@fireworks-js/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineHistory, AiOutlineSend, AiOutlineSwap } from "react-icons/ai";
import { FaCoins, FaGamepad } from "react-icons/fa";
import { IoPeople, IoWalletOutline } from "react-icons/io5";
import Joyride from "react-joyride";

import { Balance } from "components/balance/balance";
import { moveBg } from "components/moveBg";
import { PushHistory } from "lib/history";
import { usePushWalletContext } from "providers/push-wallet-provider";
import { ActionCard } from "./action-card";
import { Send } from "./send";
import { onboardingSteps } from "./onboarding-steps";
import { WalletActions } from "./wallet-actions";
import { usePushPresetRead } from "lib/storage-contract";
import { ProjectList } from "./project-list/project-list";
import {
  DEFI_PROJECTS,
  GAME_PROJECTS,
  SOCIAL_PROJECTS,
} from "./project-list/projects";

import {
  AddressActivityListView,
  TransactionsList,
} from "@covalenthq/goldrush-kit";
import { TransactionHistoryModal } from "./tx-history-modal";

const Container = styled.div`
  margin-top: 2vh;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  z-index: 1;
`;

const $Heading = styled(Heading)`
  ${moveBg}
` as typeof Heading;

const Highlight = styled.span<{ withRightMargin?: boolean }>`
  border-radius: 16px;
  background-color: rgba(255, 128, 0, 0.15);
  padding: 4px 6px;
  cursor: pointer;

  ${(p) => p.withRightMargin && "margin-right: 6px"};

  &:hover {
    padding: 6px 6px;
    background-color: rgba(255, 38, 0, 0.208);
  }
`;

type Action = "send" | "swap" | "earn" | "games" | "markets" | null;

export const WalletContent = () => {
  const { account, privateKey, totalUsdAmount } = usePushWalletContext();
  const [action, setAction] = useState<Action>("send");

  const ref = useRef<FireworksHandlers>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.updateOptions({ intensity: 1 });
    }, 6000);
  }, []);

  const { toName, fromName, message, fireworks, onboarding } =
    usePushPresetRead(account.address);

  const isOnboardingCompleted = useMemo(
    () => PushHistory.isOnboardingCompleted(privateKey),
    [privateKey]
  );

  const {
    isOpen: showWalletActions,
    onToggle: toggleWalletActions,
    onClose: closeWalletActions,
  } = useDisclosure({ defaultIsOpen: false });

  const {
    isOpen: showTxHistory,
    onToggle: toggleTxHistory,
    onClose: closeTxHistory,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  useEffect(() => {
    if (!account) {
      return;
    }
    PushHistory.addToHistory({
      secret: privateKey,
      type: "viewed",
      date: new Date(),
    });
  }, [account, privateKey]);

  const handleActionClick = (newAction: Action) => {
    closeWalletActions();
    if (action === newAction) {
      setAction(null);
    } else {
      setAction(newAction);
    }
  };

  return (
    <Container>
      <Joyride
        continuous
        steps={onboardingSteps}
        run={onboarding && !isOnboardingCompleted}
        callback={({ action }) => {
          if (action === "reset" || action === "stop") {
            PushHistory.setOnboardingCompleted(privateKey);
          }
        }}
        showProgress
        showSkipButton
        locale={{
          back: "Back",
          close: "Close",
          last: "Last",
          next: "Next",
          skip: "Skip",
        }}
        disableOverlay
      />
      {fireworks && (
        <Fireworks
          ref={ref}
          options={{
            opacity: 0.5,
            hue: { min: 230, max: 360 },
            mouse: { click: true },
          }}
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      )}
      <Column>
        <Fade in={true}>
          <Stack justify="center" align="center" mb={8}>
            {toName && (
              <$Heading mb={3} textAlign="center" size="lg">
                Hey, {toName}
              </$Heading>
            )}
            <$Heading textAlign="center" size="lg">
              You received{" "}
              <Highlight
                className="onboard-highlight"
                withRightMargin={!!fromName}
              >
                ${totalUsdAmount}
              </Highlight>
              {fromName && `from ${fromName}`}
            </$Heading>
            {message && (
              <Stack mt={2} maxWidth="500px">
                <Text textAlign="center">{message}</Text>
              </Stack>
            )}
          </Stack>
        </Fade>
        <Fade in={true}>
          <Stack justify="center" align="center" mb={6}>
            <Balance className="onboard-balance" />
          </Stack>
        </Fade>
        <Stack align="center">
          <Stack className="x" width={370} direction="row" spacing={4} mb={2}>
            <ActionCard
              className="onboard-send"
              onClick={() => handleActionClick("send")}
              active={action === "send"}
              label="Send"
            >
              <Icon width="32px" height="32px" as={AiOutlineSend} />
            </ActionCard>
            <ActionCard
              className="onboard-swap"
              onClick={() => handleActionClick("swap")}
              active={action === "swap"}
              label="Swap"
            >
              <Icon width="32px" height="32px" as={AiOutlineSwap} />
            </ActionCard>
          </Stack>
          <Stack
            className="onboard-ecosystem"
            width={370}
            direction="row"
            spacing={4}
          >
            <ActionCard
              onClick={() => handleActionClick("earn")}
              active={action === "earn"}
              label="DeFi"
            >
              <Icon width="28px" height="28px" as={FaCoins} />
            </ActionCard>
            <ActionCard
              onClick={() => handleActionClick("games")}
              active={action === "games"}
              label="Games"
            >
              <Icon width="30px" height="30px" as={FaGamepad} />
            </ActionCard>
            <ActionCard
              onClick={() => handleActionClick("markets")}
              active={action === "markets"}
              label="Social"
            >
              <Icon width="28px" height="28px" as={IoPeople} />
            </ActionCard>
          </Stack>
        </Stack>
        <Stack align="center" mt={7} mb={3}>
          {action === "send" && <Send />}
          {action === "swap" && <p>Swaps are coming soon 👀</p>}
          {action === "earn" && (
            <ProjectList
              projects={DEFI_PROJECTS}
              label="Scroll DeFi projects"
            />
          )}
          {action === "games" && (
            <ProjectList
              projects={GAME_PROJECTS}
              label="Play to earn and web3 games"
            />
          )}
          {action === "markets" && <ProjectList projects={SOCIAL_PROJECTS} />}
        </Stack>
        <Stack direction="row" justify="center" align="center" my={3}>
          <Button
            className="onboard-wallet-actions"
            variant="outline"
            colorScheme="pink"
            size="sm"
            onClick={() => {
              toggleWalletActions();
              setAction(null);
            }}
            mb={3}
          >
            Wallet
            <Icon ml={2} width="16px" height="16px" as={IoWalletOutline} />
          </Button>
          <Button
            variant="outline"
            colorScheme="pink"
            size="sm"
            onClick={() => {
              toggleTxHistory();
            }}
            mb={3}
          >
            Tx History
            <Icon ml={2} width="16px" height="16px" as={AiOutlineHistory} />
          </Button>
          <TransactionHistoryModal
            isOpen={showTxHistory}
            onClose={closeTxHistory}
          />
        </Stack>
        <Stack>
          <Fade in={showWalletActions} unmountOnExit={true}>
            <WalletActions />
          </Fade>
        </Stack>
      </Column>
    </Container>
  );
};
