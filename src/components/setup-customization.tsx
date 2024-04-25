import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { TransactionReceipt, TransactionResponse } from "ethers";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  usePushPresetRead,
} from "lib/storage-contract";
import { usePushWalletContext } from "providers/push-wallet-provider";
import { config } from "providers/wagmi-web3-provider";
import { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

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

export const SetupCustomization = ({ className }: Props) => {
  const { account } = usePushWalletContext();

  const currentPreset = usePushPresetRead(account.address);
  const { writeContractAsync } = useWriteContract();

  const toast = useToast();

  useEffect(() => {
    setFromName(currentPreset.fromName);
    setToName(currentPreset.toName);
    setMessage(currentPreset.message);
    setOnboarding(currentPreset.onboarding);
    setFireworks(currentPreset.fireworks);
  }, [currentPreset]);

  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [message, setMessage] = useState("");
  const [onboarding, setOnboarding] = useState(false);
  const [fireworks, setFireworks] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    try {
      const res = await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "write",
        args: [
          account.address,
          JSON.stringify({ fireworks, onboarding, fromName, toName, message }),
        ],
      });

      const data = await waitForTransactionReceipt(config, { hash: res });
      console.log(data);
      toast({
        title: `Preset applied, tx: ${data.transactionHash}`,
        status: "success",
      });
    } catch (e) {
      console.log(e);
      // @ts-ignore
      toast({ title: e, status: "error" });
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
      {/* <Stack my={3} justify="center" align="center">
        <Tag
          variant="solid"
          bg={tagBgColor[colorMode]}
          textColor={tagTextColor[colorMode]}
        >
          Apply customization to earn points
        </Tag>
      </Stack> */}

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
      <FormLabel>Message</FormLabel>
      <Textarea
        mb={2}
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        disabled={isSending}
        maxLength={240}
        placeholder="Enter message (optional)"
      />
      <Stack my={2} direction="row" align="center">
        <Checkbox
          disabled={isSending}
          isChecked={onboarding}
          borderColor="gray.300"
          colorScheme="red"
          onChange={({ target: { checked } }) => setOnboarding(checked)}
        />
        <Text fontSize="14px">
          Onboarding{" "}
          <Tooltip
            label={
              "Run step-by-step onboarding to crypto and Scroll ecosystem when the push is opened"
            }
          >
            <QuestionOutlineIcon ml="4px" mb="2px" fill="gray" color="gray" />
          </Tooltip>
        </Text>
      </Stack>
      <Stack mb={5} direction="row" align="center">
        <Checkbox
          disabled={isSending}
          isChecked={fireworks}
          borderColor="gray.300"
          colorScheme="red"
          onChange={({ target: { checked } }) => setFireworks(checked)}
        />
        <Text fontSize="14px">Fireworks</Text>
      </Stack>

      <Stack mt={3} justify="center">
        <Button
          onClick={handleSend}
          isDisabled={
            !fromName && !toName && !message && !onboarding && !fireworks
          }
          colorScheme="red"
          isLoading={isSending}
          loadingText="Wait..."
          type="submit"
        >
          Apply
        </Button>
      </Stack>
    </div>
  );
};
