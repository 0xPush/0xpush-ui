import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "../pages/home/home";
import { PushHistoryPopup } from "../components/core/push-history-popup";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Home />
      <PushHistoryPopup />
    </>
  );
}
