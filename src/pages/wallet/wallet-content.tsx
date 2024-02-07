import { useEffect, useRef, useState } from "react";
import {
  Button,
  Fade,
  Heading,
  Icon,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AiOutlineSend, AiOutlineSwap } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { FaCoins, FaGamepad, FaShoppingBag } from "react-icons/fa";

import { useInnerWalletContext } from "../../providers/inner-wallet-provider";
import { moveBg } from "../../components/moveBg";
import { PushHistory } from "../../lib/history";
import { ActionCard } from "./action-card";
import { WalletActions } from "./wallet-actions";
import { Balance } from "../../components/balance/balance";
import { Earn } from "./cards/earn";
import { Send } from "./cards/send";
import { readPushPreset } from "../../lib/storage-contract";
import { PushPreset } from "../../types/preset";

const Container = styled.div`
  margin-top: 2vh;
  display: flex;
  flex: 1;
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
`;

type Action = "send" | "swap" | "earn" | "games" | "markets" | null;

export const WalletContent = () => {
  const { wallet, totalUsdAmount, updateBalance } = useInnerWalletContext();
  const [action, setAction] = useState<Action>(null);

  const [{ fromName, toName }, setPreset] = useState<PushPreset>({
    fromName: null,
    toName: null,
    fromAddress: null,
  });

  const {
    isOpen: showWalletActions,
    onToggle: toggleWalletActions,
    onClose: closeWalletActions,
  } = useDisclosure({ defaultIsOpen: false });

  const sendRef = useRef<HTMLDivElement>();
  const swapRef = useRef();
  const earnRef = useRef();
  const walletRef = useRef();

  useEffect(() => {
    readPushPreset(wallet.address)
      .then(setPreset)
      .catch((e) => {
        console.log(e);
      });
  }, [wallet.address]);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    PushHistory.addToHistory({
      secret: wallet.privateKey,
      type: "viewed",
      date: new Date(),
    });
  }, [wallet]);

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
      <Fade in={true}>
        <Stack justify="center" align="center" mb={8}>
          {toName && (
            <$Heading mb={3} textAlign="center" size="lg">
              Hey, {toName}
            </$Heading>
          )}
          <$Heading textAlign="center" size="lg">
            You received <Highlight>{totalUsdAmount}</Highlight> USD{" "}
            {fromName && `from ${fromName}`}
          </$Heading>
        </Stack>
      </Fade>
      <Fade in={true}>
        <Stack justify="center" align="center" mb={6}>
          <Balance />
        </Stack>
      </Fade>
      <Stack align="center">
        <Stack width={370} direction="row" spacing={4} mb={2}>
          <ActionCard
            ref={sendRef}
            onClick={() => handleActionClick("send")}
            active={action === "send"}
            label="Send"
          >
            <Icon width="32px" height="32px" as={AiOutlineSend} />
          </ActionCard>
          <ActionCard
            ref={swapRef}
            onClick={() => handleActionClick("swap")}
            active={action === "swap"}
            label="Swap"
          >
            <Icon width="32px" height="32px" as={AiOutlineSwap} />
          </ActionCard>
        </Stack>
        <Stack width={370} direction="row" spacing={4}>
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
            label="Markets"
          >
            <Icon width="28px" height="28px" as={FaShoppingBag} />
          </ActionCard>
        </Stack>
      </Stack>
      <Stack align="center" mt={7} mb={3}>
        {action === "earn" && <Earn />}
        {action === "send" && <Send />}
        {action === "swap" && <p>Swaps are coming soon 👀</p>}
        {/* {action === "games" && <Games />}
        {action === "markets" && <Markets />} */}
      </Stack>
      <Stack align="center" my={3}>
        <Button
          // @ts-ignore
          ref={walletRef}
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
    </Container>
  );
};
