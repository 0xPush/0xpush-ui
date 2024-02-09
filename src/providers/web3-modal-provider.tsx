import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";

const projectId = "7874a82faa6eab4fe78dc5902b7955d1";

// 2. Set chains
export const blastTestnet = {
  chainId: 168587773,
  name: "Blast Sepolia",
  currency: "ETH",
  explorerUrl: "https://testnet.blastscan.io",
  rpcUrl: "https://sepolia.blast.io",
};

// 3. Create modal
const metadata = {
  name: "Blastpush.xyz",
  description: "Blastpush.xyz",
  url: "https://blastpush.xyz", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  defaultChain: blastTestnet,
  ethersConfig: defaultConfig({
    metadata,
    enableEmail: false,
    enableCoinbase: false,
  }),

  chains: [blastTestnet],
  chainImages: {
    [blastTestnet.chainId]:
      "https://assets-global.website-files.com/65a6baa1a3f8ed336f415cb4/65a6cee39aadb0fa7418aa77_Blast%20Logo%20Icon%20Yellow.svg",
  },
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

interface Props {
  children: ReactNode;
}

export const Web3ModalProvider = ({ children }: Props): JSX.Element => {
  return <>{children}</>;
};
