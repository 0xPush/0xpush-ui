import { createLazyFileRoute } from "@tanstack/react-router";
import { InnerWalletProvider } from "../providers/inner-wallet-provider";
import { PushHistoryPopup } from "../components/push-history-popup";
import { WalletContent } from "../pages/wallet";

export const Route = createLazyFileRoute("/w/$privateKey")({
  component: Component,
});

function Component() {
  const { privateKey } = Route.useParams();

  return (
    <InnerWalletProvider privateKey={privateKey}>
      <WalletContent />
      <PushHistoryPopup />
    </InnerWalletProvider>
  );
}
