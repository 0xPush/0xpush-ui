import { createLazyFileRoute } from "@tanstack/react-router";
import { InnerWalletProvider } from "../providers/inner-wallet-provider";
import { Deposit } from "../pages/deposit/deposit";

export const Route = createLazyFileRoute("/w/$privateKey/deposit")({
  component: Component,
});

function Component() {
  const { privateKey } = Route.useParams();
  return (
    <InnerWalletProvider privateKey={privateKey}>
      <Deposit />
    </InnerWalletProvider>
  );
}
