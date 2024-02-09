import { createLazyFileRoute } from "@tanstack/react-router";
import { PushWalletProvider } from "providers/push-wallet-provider";
import { Deposit } from "pages/deposit";
import { PushHistoryPopup } from "components/push-history-popup";

export const Route = createLazyFileRoute("/w/$privateKey/deposit")({
  component: Component,
});

function Component() {
  const { privateKey } = Route.useParams();
  return (
    <PushWalletProvider privateKey={privateKey}>
      <Deposit />
      <PushHistoryPopup />
    </PushWalletProvider>
  );
}
