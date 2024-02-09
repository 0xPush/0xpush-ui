import { Link } from "@chakra-ui/react";
import { Step } from "react-joyride";

export const onboardingSteps: Step[] = [
  {
    target: ".onboard-highlight",
    content: (
      <div>
        Congratulations! You have received crypto in{" "}
        <Link color="red" href="https://blast.io" target="_blank">
          Blast Network.
        </Link>{" "}
        This page is a lightweight wallet. You can claim your funds and make
        deep dive to the Blast ecosystem. Keep the link to this page a secret!"
      </div>
    ),
  },
  {
    target: ".onboard-balance",
    content:
      "This is your assets. Manage them however you want. In Blast network this funds has 4% for ETH and 5% APR for stablecoins yield. Blast is not about inflation!",
  },
  {
    target: ".onboard-send",
    content: "Here you can send funds funds to any address",
  },
  {
    target: ".onboard-swap",
    content: "Soon you'll be able to swap tokens right here",
  },
  {
    target: ".onboard-ecosystem",
    content: "These are projects of the Blast ecosystem. Just try to use them.",
  },
  {
    target: ".onboard-wallet-actions",
    content: "Here you can deposit Push wallet or export it",
  },
  {
    target: ".onboard-wallet-connect",
    content:
      "Connect an existing wallet for interaction or withdrawal of funds",
  },
  {
    target: ".onboard-points",
    content: "Learn about the future reward point system. Good luck!",
  },
];
