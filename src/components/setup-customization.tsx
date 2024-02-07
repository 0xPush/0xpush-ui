import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Button, Heading, Input, Stack, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  BrowserProvider,
  TransactionReceipt,
  TransactionResponse,
} from "ethers";
import { useEffect, useMemo, useState } from "react";
import { readPushPreset, writePushPreset } from "../lib/storage-contract";
import { useInnerWalletContext } from "../providers/inner-wallet-provider";

const FormLabel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-right: 0;
  margin-bottom: 6px;
  margin-left: 4px;
  font-size: 12px;
`;

interface Props {
  to: string;
  onSuccess?: (tx: TransactionResponse, receipt: TransactionReceipt) => void;
  onError?: (err: Error) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  fromConnectedWallet?: boolean;
}

export const SetupCustomization = ({
  to,
  onError,
  onSuccess,
  className,
}: Props) => {
  const { wallet, ethBalance, updateBalance } = useInnerWalletContext();
  const { walletProvider } = useWeb3ModalProvider();

  const ethersProvider = useMemo(
    () => new BrowserProvider(walletProvider!),
    [walletProvider]
  );

  useEffect(() => {
    readPushPreset(to)
      .then((preset) => {
        setFromName(preset.fromName || "");
        setToName(preset.toName || "");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [to]);

  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");

  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);

    try {
      const signer = await ethersProvider.getSigner();
      const tx = await writePushPreset(signer, to, fromName, toName);
      const receipt = await tx.wait();

      console.log(receipt);
      updateBalance();
      onSuccess?.(tx, receipt!);
    } catch (e) {
      console.error(e);
      onError?.(e as Error);
    }

    setIsSending(false);
  };

  return (
    <div className={className}>
      <Heading mb={2} fontSize="small" textAlign="center">
        Customize
        <Tooltip label={"Show data for recipient (stored on-chain)"}>
          <QuestionOutlineIcon ml="6px" />
        </Tooltip>
      </Heading>
      <FormLabel>Sender</FormLabel>
      <Input
        mb={3}
        placeholder="Alex"
        value={fromName}
        onChange={({ target: { value } }) => setFromName(value)}
        disabled={isSending}
        maxLength={60}
      />
      <FormLabel>Recipient name</FormLabel>
      <Input
        mb={2}
        placeholder="Alice"
        value={toName}
        onChange={({ target: { value } }) => setToName(value)}
        disabled={isSending}
        maxLength={60}
      />

      <Stack mt={3} justify="center">
        <Button
          onClick={handleSend}
          isDisabled={false}
          colorScheme="purple"
          isLoading={isSending}
          loadingText="Wait..."
          type="submit"
        >
          Save data
        </Button>
      </Stack>
    </div>
  );
};
