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
        This page is a lightweight wallet. You can claim your funds and make a
        deep dive into the Blast ecosystem. Keep this page's link a secret!
      </div>
    ),
  },
  {
    target: ".onboard-balance",
    content:
      "These are your assets. You can manage them however you want. In Blast network these funds have 4% for ETH and 5% APR for stablecoins yield. Blast is not about inflation!",
  },
  {
    target: ".onboard-send",
    content: "Here you can send funds to any address",
  },
  {
    target: ".onboard-swap",
    content: "Soon you'll be able to swap tokens right here",
  },
  {
    target: ".onboard-ecosystem",
    content:
      "These ar the projects of the Blast ecosystem. You can try them out if you like so!",
  },
  {
    target: ".onboard-wallet-actions",
    content: "Here you can make a deposit to your Push wallet or export it",
  },
  {
    target: ".onboard-wallet-connect",
    content:
      "Connect an existing wallet for interaction or withdrawal of funds",
  },
  {
    target: ".onboard-points",
    content:
      "Here you can learn about the future reward point system. Good luck!",
  },
];
