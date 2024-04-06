import { getTokenOptionList } from "components/token-input/utils";
import { useCallback, useMemo } from "react";
import { Address, Chain, erc20Abi } from "viem";
import { usePublicClient } from "wagmi";

export const useMulticallBalance = (chain: Chain, address: Address) => {
   const client = usePublicClient();
   const tokens = useMemo(() => getTokenOptionList(chain), [chain])

   const contracts = useMemo(() => tokens.map(t => ({
      address: t.token.address as Address, 
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address]
   })), [tokens, address])


   const fn = useCallback(async () => {   
      const results = await client!.multicall({
         contracts
      })
      return results.reduce((acc, cur, index) => {
         acc[contracts[index].address] = cur.result as bigint ?? 0n;
         return acc
      }, {} as Record<Address, bigint>)
   }, [client, contracts])

   return fn
}