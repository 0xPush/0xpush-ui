import { Wallet, ethers } from "ethers";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface InnerWalletContextValue {
  wallet: Wallet;
  privateKey: string;
  ethBalance: bigint;
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
  const wallet = useMemo(
    () => new ethers.Wallet(privateKey, ethersProvider),
    [privateKey]
  );

  const [ethBalance, setEthBalance] = useState<bigint>(0n);

  useEffect(() => {
    if (wallet) {
      wallet.provider
        ?.getBalance(wallet.address)
        .then((data) => setEthBalance(data));
    }
  }, [wallet]);

  const value = useMemo(
    (): InnerWalletContextValue => ({ wallet, privateKey, ethBalance }),
    [wallet, privateKey, ethBalance]
  );

  return (
    <InnerWalletContext.Provider value={value}>
      {children}
    </InnerWalletContext.Provider>
  );
};
