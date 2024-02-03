import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";

const projectId = "7874a82faa6eab4fe78dc5902b7955d1";

// 2. Set chains
const mainnet = {
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
  ethersConfig: defaultConfig({
    metadata,
    enableEmail: false,
    enableCoinbase: false,
  }),
  chains: [mainnet],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

interface Props {
  children: ReactNode;
}

export const Web3ModalProvider = ({ children }: Props): JSX.Element => {
  return <>{children}</>;
};
