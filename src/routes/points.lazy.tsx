import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/points")({
  component: Component,
});

function Component() {
  return <div>points</div>;
}
