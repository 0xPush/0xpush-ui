import { Wallet, ethers } from "ethers";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface InnerWalletContextValue {
  wallet: Wallet;
  privateKey: string;
  ethBalance: bigint;
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
  const wallet = useMemo(
    () => new ethers.Wallet(privateKey, ethersProvider),
    [privateKey]
  );

  const [ethBalance, setEthBalance] = useState<bigint>(0n);

  const updateBalance = useCallback(() => {
    wallet.provider
      ?.getBalance(wallet.address)
      .then((data) => setEthBalance(data));
  }, []);

  useEffect(() => {
    if (wallet) {
      updateBalance();
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
