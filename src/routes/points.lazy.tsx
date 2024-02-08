import { createLazyFileRoute } from "@tanstack/react-router";
import { PushHistoryPopup } from "components/push-history-popup";
import { Points } from "pages/points";

export const Route = createLazyFileRoute("/points")({
  component: Component,
});

function Component() {
  return (
    <>
      <Points />
      <PushHistoryPopup />
    </>
  );
}
