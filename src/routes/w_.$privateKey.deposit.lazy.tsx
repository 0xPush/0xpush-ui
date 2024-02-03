import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/w/$privateKey/deposit')({
    component: Deposit,
  })
  
function Deposit() {
  const { privateKey } = Route.useParams();
 return <div className="p-2"> Deposit key: {privateKey}</div>
}