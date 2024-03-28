import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { ReactNode } from "react";

import { WagmiProvider } from "wagmi";
import {
  optimism,
  optimismSepolia,
  base,
  baseSepolia,
  mode,
  modeTestnet,
} from "wagmi/chains";

// WalletConnect project ID
const projectId = "7874a82faa6eab4fe78dc5902b7955d1";

// 3. Create modal
const metadata = {
  name: "0xPush.xyz",
  description: "0xPush.xyz",
  url: "https://0xpush.xyz", // origin must match your domain & subdomain
  icons: [],
};

const chains = [
  optimism,
  optimismSepolia,
  base,
  baseSepolia,
  mode,
  modeTestnet,
] as const;

export const config = defaultWagmiConfig({
  projectId,
  chains,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
