import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { TransactionReceipt, TransactionResponse } from "ethers";
import { useState } from "react";
import { useClient } from "wagmi";

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
  // const { updateBalance, wallet } = usePushWalletContext();
  const client = useClient();

  // console.log(client);

  const { colorMode } = useColorMode();
  const tagBgColor = { light: "gray.100", dark: "whiteAlpha.100" };
  const tagTextColor = { light: "gray.500", dark: "whiteAlpha.500" };

  // const ethersProvider = useMemo(
  //   () => new BrowserProvider(walletProvider!),
  //   [walletProvider]
  // );

  // useEffect(() => {
  //   readPushPreset(to, wallet.provider!)
  //     .then((preset) => {
  //       setFromName(preset.fromName || "");
  //       setToName(preset.toName || "");
  //       setMessage(preset.message || "");
  //       setOnboarding(preset.onboarding);
  //       setFireworks(preset.fireworks);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [to, wallet.provider]);

  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [message, setMessage] = useState("");
  const [onboarding, setOnboarding] = useState(false);
  const [fireworks, setFireworks] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    // setIsSending(true);
    // try {
    //   const signer = await ethersProvider.getSigner();
    //   const tx = await writePushPreset(
    //     signer,
    //     to,
    //     fromName,
    //     toName,
    //     onboarding,
    //     fireworks,
    //     message
    //   );
    //   const receipt = await tx.wait();
    //   console.log(receipt);
    //   updateBalance();
    //   onSuccess?.(tx, receipt!);
    // } catch (e) {
    //   console.error(e);
    //   onError?.(e as Error);
    // }
    // setIsSending(false);
  };

  return (
    <div className={className}>
      <Heading mb={2} fontSize="small" textAlign="center">
        Customize
        <Tooltip label={"Show data for recipient (stored on-chain)"}>
          <QuestionOutlineIcon ml="6px" />
        </Tooltip>
      </Heading>
      <Stack my={3} justify="center" align="center">
        <Tag
          variant="solid"
          bg={tagBgColor[colorMode]}
          textColor={tagTextColor[colorMode]}
        >
          Apply customization to earn points
        </Tag>
      </Stack>

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
          colorScheme="purple"
          onChange={({ target: { checked } }) => setOnboarding(checked)}
        />
        <Text fontSize="14px">
          Onboarding{" "}
          <Tooltip
            label={
              "Run step-by-step onboarding to crypto and Blast ecosystem when the push is opened"
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
          colorScheme="purple"
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
