import { Link } from "@chakra-ui/react";
import { Step } from "react-joyride";

export const onboardingSteps: Step[] = [
  {
    target: ".onboard-highlight",
    content: (
      <div>
        Congratulations! You have received crypto in{" "}
        <Link color="red" href="https://scroll.io" target="_blank">
          Scroll Network.
        </Link>{" "}
        This page is a lightweight wallet. You can claim your funds and make a
        deep dive into the Scroll ecosystem. Keep this page's link a secret!
      </div>
    ),
  },
  {
    target: ".onboard-balance",
    content:
      "These are your assets. You can manage them however you want.",
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
      "These are the projects of the Scroll ecosystem. You can try them out if you like so!",
  },
  {
    target: ".onboard-wallet-actions",
    content: "Here you can make a deposit to your Push wallet or export it",
  },
  {
    target: ".onboard-wallet-connect",
    content:
      "Connect wallet for interaction or withdrawal assets. Bye!",
  },
];
