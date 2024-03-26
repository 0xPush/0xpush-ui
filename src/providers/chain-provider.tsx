import { JsonRpcProvider } from "ethers";
import { ReactNode, createContext, useContext, useState } from "react";

export type ChainType = "opSepolia";

export const opSepolia = {
  chainId: 11155420,
  name: "OP Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia-optimistic.etherscan.io",
  rpcUrl: "https://sepolia.optimism.io",
};

export const CHAINS: Partial<Record<ChainType, typeof opSepolia>> = {
  opSepolia,
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
  const [chainType, setChainType] = useState<ChainType>("opSepolia");

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
