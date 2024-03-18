import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { blastMainnet, blastTestnet } from "./chain-provider";

const walletConnectProjectId = "7874a82faa6eab4fe78dc5902b7955d1";

// 3. Create modal
const metadata = {
  name: "Blastpush.xyz",
  description: "Blastpush.xyz",
  url: "https://blastpush.xyz", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  defaultChain: blastMainnet,
  ethersConfig: defaultConfig({
    metadata,
    enableEmail: false,
    enableCoinbase: false,
  }),

  chains: [blastMainnet],
  chainImages: {
    [blastTestnet.chainId]:
      "https://assets-global.website-files.com/65a6baa1a3f8ed336f415cb4/65a6cee39aadb0fa7418aa77_Blast%20Logo%20Icon%20Yellow.svg",
    [blastMainnet.chainId]:
      "https://assets-global.website-files.com/65a6baa1a3f8ed336f415cb4/65a6cee39aadb0fa7418aa77_Blast%20Logo%20Icon%20Yellow.svg",
  },
  projectId: walletConnectProjectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});
