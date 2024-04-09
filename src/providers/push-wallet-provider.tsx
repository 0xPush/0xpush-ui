import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Address, Chain, PrivateKeyAccount, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useBalance, useConfig } from "wagmi";
import { GetBalanceData } from "wagmi/query";
import { usePrice } from "./price-provider";
import { shortString } from "lib/string";

interface PushWalletContextValue {
  chain: Chain;
  account: PrivateKeyAccount;
  privateKey: string;
  ethBalance: GetBalanceData | undefined;
  totalUsdAmount: string;
}

// @ts-expect-error
export const PushWalletContext = createContext<PushWalletContextValue>();
export const usePushWalletContext = () => useContext(PushWalletContext);

export const PushWalletProvider = ({
  privateKey,
  children,
}: {
  privateKey: string;
  children: ReactNode;
}) => {
  const config = useConfig();
  const [chain, setChain] = useState(config.chains[0]);

  const { ethPriceUsd } = usePrice();
  const account = privateKeyToAccount(privateKey as Address);

  const { data: ethBalance } = useBalance(account);

  const totalUsdAmount = (
    ethPriceUsd * Number(formatEther(ethBalance?.value || 0n))
  ).toFixed(2);

  useEffect(() => {
    if (account) {
      document.title = `${shortString(account.address)} | 0xPush`;
    }

    return () => {
      document.title = "0xPush";
    };
  }, [account]);

  const value = useMemo(
    (): PushWalletContextValue => ({
      chain,
      account,
      privateKey,
      ethBalance,
      totalUsdAmount,
    }),
    [account, privateKey, ethBalance, totalUsdAmount, chain]
  );

  return (
    <PushWalletContext.Provider value={value}>
      {children}
    </PushWalletContext.Provider>
  );
};
