import { createLazyFileRoute } from "@tanstack/react-router";
import { InnerWalletProvider } from "providers/inner-wallet-provider";
import { Deposit } from "pages/deposit";
import { PushHistoryPopup } from "components/push-history-popup";

export const Route = createLazyFileRoute("/w/$privateKey/deposit")({
  component: Component,
});

function Component() {
  const { privateKey } = Route.useParams();
  return (
    <InnerWalletProvider privateKey={privateKey}>
      <Deposit />
      <PushHistoryPopup />
    </InnerWalletProvider>
  );
}
