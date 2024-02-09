import { createLazyFileRoute } from "@tanstack/react-router";
import { PushWalletProvider } from "../providers/push-wallet-provider";
import { PushHistoryPopup } from "../components/push-history-popup";
import { WalletContent } from "../pages/wallet";

export const Route = createLazyFileRoute("/w/$privateKey")({
  component: Component,
});

function Component() {
  const { privateKey } = Route.useParams();

  return (
    <PushWalletProvider privateKey={privateKey}>
      <WalletContent />
      <PushHistoryPopup />
    </PushWalletProvider>
  );
}
