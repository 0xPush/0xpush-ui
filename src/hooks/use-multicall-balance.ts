import {
  getDefaultNativeToken,
  getTokenOptionList,
} from "components/token-input/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TokenOption } from "types/token";
import { Address, Chain, erc20Abi } from "viem";
import { useBalance, usePublicClient } from "wagmi";

export const useTokens = (chain: Chain, address: Address) => {
  const tokens = useMemo(() => getTokenOptionList(chain), [chain]);
  const getBalances = useMulticallBalance(chain, address);

  const [result, setResult] = useState<TokenOption[]>([]);

  useEffect(() => {
    getBalances().then((balances) => {
      setResult(() =>
        tokens.map((t) => ({
          ...t,
          quantity: balances[t.token.address as Address],
        }))
      );
    });
  }, [getBalances, tokens]);

  return result;
};

export const useMulticallBalance = (chain: Chain, address: Address) => {
  const client = usePublicClient();
  const tokens = useMemo(() => getTokenOptionList(chain), [chain]);
  const nativeToken = useMemo(() => getDefaultNativeToken(chain), [chain]);

  const { data: nativeBalance } = useBalance({ address, chainId: chain?.id });

  const contracts = useMemo(
    () =>
      tokens
        .filter((t) => !t.isNative)
        .map((t) => ({
          address: t.token.address as Address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        })),
    [tokens, address]
  );

  const fn = useCallback(async () => {
    const data = await client!.multicall({
      contracts,
    });

    const res = data.reduce(
      (acc, cur, index) => {
        acc[contracts[index].address] = (cur.result as bigint) ?? 0n;
        return acc;
      },
      {} as Record<Address, bigint>
    );

    res[nativeToken.token.address! as Address] = nativeBalance?.value ?? 0n;

    return res;
  }, [client, contracts, nativeBalance?.value, nativeToken.token.address]);

  return fn;
};
