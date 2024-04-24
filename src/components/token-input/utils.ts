import { TokenListItem, TokenOption } from "types/token";
import tokenList from "./token-list.json";
import { Chain } from "viem";

export const getTokenOptionList = (chain?: Chain): TokenOption[] =>
  (tokenList as unknown as TokenListItem[])
    .filter((t) => (chain ? t.chainId === chain?.id : true))
    .map((token) => ({
      token,
      quantity: null,
      balanceUSD: null,
      isNative: token.symbol === (chain?.nativeCurrency.symbol ?? "ETH"),
      price: null,
    }));

export const getDefaultNativeToken = (chain?: Chain): TokenOption => {
  console.log(getTokenOptionList(chain));

  return getTokenOptionList(chain).find((t) => t.isNative)!;
};
