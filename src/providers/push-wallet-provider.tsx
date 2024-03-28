import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePrice } from "./price-provider";
import { shortString } from "lib/string";
import { useChainContext } from "./chain-provider";
import { useInterval } from "hooks/use-interval";
import { useClient, usePublicClient } from "wagmi";
import { Address, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "./web3-modal-init";
import { mainnet } from "viem/chains";

interface PushWalletContextValue {
  wallet: Wallet;
  privateKey: string;
  ethBalance: bigint;
  totalUsdAmount: string;
  transferEstimateFee: bigint;
  updateBalance: () => void;
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
  const { ethPriceUsd } = usePrice();

  const bowserClient = useClient();

  const account = privateKeyToAccount(privateKey as Address);

  const client = createWalletClient({
    account,
    transport: http(),
    chain: mainnet,
  });

  const [ethBalance, setEthBalance] = useState<bigint>(0n);
  const [estimateFee, setEstimateFee] = useState<bigint>(0n);

  const totalUsdAmount = (
    ethPriceUsd * Number(formatEther(ethBalance))
  ).toFixed(2);

  const updateBalance = useCallback(() => {
    console.log("upd push balance");
    wallet.provider
      ?.getBalance(wallet.address)
      .then((data) => setEthBalance(data));
  }, [wallet.address, wallet.provider]);

  useInterval(updateBalance, 5000);

  const updateEstimateFee = useCallback(async () => {
    const gasPrice = (await ethersProvider.getFeeData()).maxFeePerGas!;

    // Estimate gas limit
    const estimateGas = await wallet.estimateGas({
      to: wallet.address,
      value: 0,
    });

    const estimateFee = estimateGas * gasPrice * 2000n;
    setEstimateFee(estimateFee);
  }, [wallet, ethersProvider]);

  useEffect(() => {
    if (wallet) {
      updateBalance();
      updateEstimateFee();

      document.title = `${shortString(wallet.address)} | 0xPush`;
    }

    return () => {
      document.title = "0xPush";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.address]);

  const value = useMemo(
    (): PushWalletContextValue => ({
      wallet,
      privateKey,
      ethBalance,
      updateBalance,
      totalUsdAmount,
      transferEstimateFee: estimateFee,
    }),
    [wallet, privateKey, ethBalance, updateBalance, totalUsdAmount, estimateFee]
  );

  return (
    <PushWalletContext.Provider value={value}>
      {children}
    </PushWalletContext.Provider>
  );
};
