import { createLazyFileRoute } from "@tanstack/react-router";
import { PushHistoryPopup } from "components/push-history-popup";
import { Faq } from "pages/faq";

export const Route = createLazyFileRoute("/faq")({
  component: Component,
});

function Component() {
  return (
    <>
      <Faq />
      <PushHistoryPopup />
    </>
  );
}
