import { TokenOption } from "types/token";
import { Address, Chain, erc20Abi } from "viem";
import { useBalance, useReadContract } from "wagmi";

export const useTokenBalance = (token: TokenOption, address: Address, chain: Chain): bigint => {
   const {data: nativeBalance} = useBalance({address, chainId: chain.id})

   const {data: erc20Balance} = useReadContract({abi: erc20Abi, address: token.token.address as Address, functionName: "balanceOf", args: [address]})
 
   if (token.isNative) {
    return nativeBalance?.value ?? 0n;
   }
   return erc20Balance ?? 0n;
}