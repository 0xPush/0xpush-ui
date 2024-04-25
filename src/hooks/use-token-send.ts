import { useState } from "react";
import { TokenOption } from "types/token";
import { Account, Address, erc20Abi, formatUnits, parseUnits } from "viem";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { useTokens } from "./use-tokens";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "providers/wagmi-web3-provider";
import { useToast } from "@chakra-ui/react";

interface SendOptions {
  token: TokenOption;
  to: Address;
  amount: string;
  account?: Account;
}

export const useTokenSend = () => {
  const [pending, setPending] = useState(false);

  const toast = useToast();
  const { sendTransaction } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();
  const { address, chain } = useAccount();
  const { refetchBalance } = useTokens(chain!, address as Address);

  const sendToken = async ({ token, amount, to, account }: SendOptions) => {
    setPending(true);

    if (token.isNative) {
      sendTransaction(
        {
          to,
          value: parseUnits(amount, token.token.decimals),
          account,
        },
        {
          onSuccess: async (hash) => {
            const receipt = await waitForTransactionReceipt(config, { hash });
            console.log(receipt);
            toast({
              title: `${formatUnits(parseUnits(amount, token.token.decimals), token.token.decimals)} ${token.token.symbol} sent. Tx: ${hash}.`,
              status: "success",
            });
            setPending(false);
            refetchBalance();
            return receipt;
          },
          onError: (e) => {
            console.log(e);
            setPending(false);
            toast({ title: e.message, status: "error" });
          },
        }
      );
    } else {
      try {
        const hash = await writeContractAsync({
          abi: erc20Abi,
          address: token.token.address as Address,
          functionName: "transfer",
          args: [to, parseUnits(amount, token.token.decimals)],
          account,
        });

        const receipt = await waitForTransactionReceipt(config, { hash });
        console.log(receipt);

        toast({
          title: `${formatUnits(parseUnits(amount, token.token.decimals), token.token.decimals)} ${token.token.symbol} sent. Tx: ${hash}.`,
          status: "success",
        });

        return receipt;
      } catch (e) {
        console.log(e);
        toast({ title: (e as any)?.message || "Error", status: "error" });
      } finally {
        refetchBalance();
        setPending(false);
      }
    }
  };

  return { sendToken, pending };
};
