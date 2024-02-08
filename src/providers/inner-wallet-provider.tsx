import { Wallet, ethers, formatEther } from "ethers";
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

interface InnerWalletContextValue {
  wallet: Wallet;
  privateKey: string;
  ethBalance: bigint;
  totalUsdAmount: string;
  transferEstimateFee: bigint;
  updateBalance: () => void;
}

// @ts-ignore
export const InnerWalletContext = createContext<InnerWalletContextValue>();
export const useInnerWalletContext = () => useContext(InnerWalletContext);

const ethersProvider = new ethers.JsonRpcProvider("https://sepolia.blast.io");

export const InnerWalletProvider = ({
  privateKey,
  children,
}: {
  privateKey: string;
  children: ReactNode;
}) => {
  const { ethPriceUsd } = usePrice();

  const wallet = useMemo(
    () => new ethers.Wallet(privateKey, ethersProvider),
    [privateKey]
  );

  const [ethBalance, setEthBalance] = useState<bigint>(0n);
  const [estimateFee, setEstimateFee] = useState<bigint>(0n);

  const totalUsdAmount = (
    ethPriceUsd * Number(formatEther(ethBalance))
  ).toFixed(2);

  const updateBalance = useCallback(() => {
    wallet.provider
      ?.getBalance(wallet.address)
      .then((data) => setEthBalance(data));
  }, [wallet.address, wallet.provider]);

  const updateEstimateFee = useCallback(async () => {
    const gasPrice = (await ethersProvider.getFeeData()).maxFeePerGas!;

    // Estimate gas limit
    const estimateGas = await wallet.estimateGas({
      to: wallet.address,
      value: 0,
    });

    const estimateFee = estimateGas * gasPrice * 1000n;
    setEstimateFee(estimateFee);
  }, [wallet]);

  useEffect(() => {
    if (wallet) {
      updateBalance();
      updateEstimateFee();

      document.title = `${shortString(wallet.address)} | BlastPush`;
    }

    return () => {
      document.title = "BlastPush";
    };
  }, [updateBalance, updateEstimateFee, wallet]);

  const value = useMemo(
    (): InnerWalletContextValue => ({
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
    <InnerWalletContext.Provider value={value}>
      {children}
    </InnerWalletContext.Provider>
  );
};
