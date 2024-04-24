import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { ReactNode } from "react";

import { WagmiProvider } from "wagmi";
import {
  scrollSepolia,
} from "wagmi/chains";

const queryClient = new QueryClient();

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
  scrollSepolia
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

export function WagmiWeb3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
