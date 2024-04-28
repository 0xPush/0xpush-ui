import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDefaultNativeToken,
  getTokenOptionList,
} from "components/token-input/utils";
import { useMemo } from "react";
import { TokenOption } from "types/token";
import { Address, Chain, erc20Abi } from "viem";
import { usePublicClient } from "wagmi";

interface UseTokens {
  tokens: TokenOption[];
  refetchBalance: () => Promise<void>;
}

interface Props {
  chain: Chain;
  address: Address;
}

export const useTokens = (chain: Chain, address: Address): UseTokens => {
  const client = usePublicClient();
  const queryClient = useQueryClient();
  const tokenList = useMemo(() => getTokenOptionList(chain), [chain]);
  const nativeToken = useMemo(() => getDefaultNativeToken(chain), [chain]);

  const contracts = useMemo(
    () =>
      tokenList
        .filter((t) => !t.isNative)
        .map((t) => ({
          address: t.token.address as Address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        })),
    [tokenList, address]
  );

  const { data: tokens = [] } = useQuery({
    queryKey: ["tokens-multicall", address],
    queryFn: async () => {
      const nativeBalance = await client!.getBalance({ address });
      const data = await client!.multicall({
        contracts,
      });

      const balances = data.reduce(
        (acc, cur, index) => {
          acc[contracts[index].address] = (cur.result as bigint) ?? 0n;
          return acc;
        },
        {} as Record<Address, bigint>
      );

      balances[nativeToken.token.address! as Address] = nativeBalance;

      return tokenList.map((t) => ({
        ...t,
        quantity: balances[t.token.address as Address],
      }));
    },
    enabled: !!address && !!chain,
  });

  const refetchBalance = async () => {
    console.log("refetch balance");
    await queryClient.invalidateQueries({ queryKey: ["tokens-multicall"] });
    await queryClient.invalidateQueries({ queryKey: ["balance"] });
  };

  return {
    tokens,
    refetchBalance,
  };
};
