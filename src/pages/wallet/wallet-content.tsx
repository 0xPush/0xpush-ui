import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Fade,
  Heading,
  Icon,
  Stack,
  Tooltip,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AiOutlineSend, AiOutlineSwap } from "react-icons/ai";
import { IoPeople, IoWalletOutline } from "react-icons/io5";
import { FaCoins, FaGamepad, FaShoppingBag } from "react-icons/fa";
import Joyride from "react-joyride";
import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";

import { usePushWalletContext } from "providers/push-wallet-provider";
import { moveBg } from "components/moveBg";
import { PushHistory } from "lib/history";
import { ActionCard } from "./action-card";
import { WalletActions } from "./wallet-actions";
import { Balance } from "components/balance/balance";
import { Earn } from "./cards/earn";
import { Send } from "./cards/send";
import { readPushPreset } from "lib/storage-contract";
import { PushPreset } from "../../types/preset";
import { onboardingSteps } from "./onboarding-steps";
import { Games } from "./cards/games";
import { Social } from "./cards/social";

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

const Highlight = styled.span`
  border-radius: 16px;
  background-color: rgba(255, 128, 0, 0.15);
  padding: 4px 6px;
  cursor: pointer;

  &:hover {
    padding: 6px 6px;
    background-color: rgba(255, 38, 0, 0.208);
  }
`;

type Action = "send" | "swap" | "earn" | "games" | "markets" | null;

export const WalletContent = () => {
  const { account, totalUsdAmount } = usePushWalletContext();
  const [action, setAction] = useState<Action>("send");

  const ref = useRef<FireworksHandlers>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.updateOptions({ intensity: 1 });
    }, 6000);
  }, []);

  const [{ fromName, toName, onboarding, fireworks, message }, setPreset] =
    useState<PushPreset>({
      fromName: null,
      toName: null,
      fromAddress: null,
      onboarding: false,
      fireworks: false,
      message: null,
    });

  const isOnboardingCompleted = useMemo(
    () => PushHistory.isOnboardingCompleted(account.source),
    [account.source]
  );

  const {
    isOpen: showWalletActions,
    onToggle: toggleWalletActions,
    onClose: closeWalletActions,
  } = useDisclosure({ defaultIsOpen: false });

  // TODO: read push preset
  // useEffect(() => {
  //   readPushPreset(wallet.address, wallet.provider!)
  //     .then(setPreset)
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [wallet.address, wallet.provider]);

  useEffect(() => {
    if (!account) {
      return;
    }
    PushHistory.addToHistory({
      secret: account.source,
      type: "viewed",
      date: new Date(),
    });
  }, [account]);

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
            PushHistory.setOnboardingCompleted(account.source);
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
              <Highlight className="onboard-highlight">
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
              label="Earn"
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
          {action === "earn" && <Earn />}
          {action === "send" && <Send />}
          {action === "swap" && <p>Swaps are coming soon 👀</p>}
          {action === "games" && <Games />}
          {action === "markets" && <Social />}
        </Stack>
        <Stack align="center" my={3}>
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
          <Fade in={showWalletActions} unmountOnExit={true}>
            <WalletActions />
          </Fade>
        </Stack>
      </Column>
    </Container>
  );
};
