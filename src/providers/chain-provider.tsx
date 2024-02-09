import { JsonRpcProvider } from "ethers";
import { ReactNode, createContext, useContext, useState } from "react";

export type ChainType = "testnet" | "mainnet";

export const blastTestnet = {
  chainId: 168587773,
  name: "Blast Sepolia",
  currency: "ETH",
  explorerUrl: "https://testnet.blastscan.io",
  rpcUrl: "https://sepolia.blast.io",
};

export const CHAINS: Partial<Record<ChainType, typeof blastTestnet>> = {
  testnet: blastTestnet,
};

export const getEthersProvider = (chain: ChainType) => {
  return new JsonRpcProvider(CHAINS[chain]!.rpcUrl);
};

interface ChainContextValue {
  chainType: ChainType;
  setChainType: (type: ChainType) => void;
  ethersProvider: JsonRpcProvider;
}

// @ts-expect-error
const ChainContext = createContext<ChainContextValue>();
export const useChainContext = () => useContext(ChainContext);

export const ChainContextProvider = ({ children }: { children: ReactNode }) => {
  const [chainType, setChainType] = useState<ChainType>("testnet");

  return (
    <ChainContext.Provider
      value={{
        chainType,
        setChainType,
        ethersProvider: getEthersProvider(chainType),
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};
