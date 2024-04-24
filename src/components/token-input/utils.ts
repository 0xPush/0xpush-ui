import { TokenListItem, TokenOption } from "types/token";
import tokenList from "./token-list.json";
import { Chain } from "viem";

export const getTokenOptionList = (chain?: Chain): TokenOption[] =>
  (tokenList as unknown as TokenListItem[])
    .filter((t) => (chain ? t.chainId === chain?.id : true))
    .map((token) => ({
      token,
      quantity: 0n,
      balanceUSD: null,
      isNative: token.isNative,
      price: null,
    }));

export const getDefaultNativeToken = (chain?: Chain): TokenOption => {
  return getTokenOptionList(chain).find((t) => t.isNative)!;
};
