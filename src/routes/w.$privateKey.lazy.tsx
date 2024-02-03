import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/w/$privateKey')({
    component: Wallet,
  })
  
function Wallet() {
  const { privateKey } = Route.useParams();
 return <div className="p-2">key: {privateKey}</div>
}