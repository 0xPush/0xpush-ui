import {
  Button,
  Heading,
  Input,
  InputGroup,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  BrowserProvider,
  TransactionReceipt,
  TransactionRequest,
  TransactionResponse,
  formatEther,
  parseUnits,
} from "ethers";
import { useEffect, useState } from "react";
import { ETHER_TOKEN } from "../models/token";
import { useInnerWalletContext } from "../providers/inner-wallet-provider";
import { usePrice } from "../providers/price-provider";
import { TokenSelect } from "./token-select";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const $InputGroup = styled(InputGroup)`
  z-index: 1;
`;

const $NumberInput = styled(NumberInput)`
  flex: 1;
  margin-right: 10px;
` as typeof NumberInput;

const $TokenSelect = styled(TokenSelect)`
  flex: 1;
  max-width: 80px;
`;

const MaxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scale(0.8);
  z-index: 1;
`;

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
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const { ethPriceUsd } = usePrice();

  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");

  const [isSending, setIsSending] = useState(false);

  // todo: read from contract

  const handleSend = async () => {
    setIsSending(true);

    const ethersProvider = new BrowserProvider(walletProvider!);
    const signer = await ethersProvider.getSigner();

    // todo: save to contract

    try {
      const tx = await signer.sendTransaction({
        to,
        // value: amount,
      });

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
        <Tooltip label={"Save some on-chain data for receiver"}>
          <QuestionOutlineIcon ml="6px" />
        </Tooltip>
      </Heading>
      <FormLabel>Sender</FormLabel>
      <Input
        mb={3}
        placeholder="Alex"
        value={fromName}
        onChange={({ target: { value } }) => setFromName(value)}
        maxLength={60}
      />
      <FormLabel>Recipient name</FormLabel>
      <Input
        mb={2}
        placeholder="Alice"
        value={toName}
        onChange={({ target: { value } }) => setToName(value)}
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
