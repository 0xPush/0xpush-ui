import { TokenListItem, TokenOption } from "types/token";
import tokenList from './token-list.json'
import { Chain } from "viem";

export const getDefaultNativeToken = (chain: Chain): TokenOption => ({
    token: (tokenList as unknown as TokenListItem[]).find(t => t.chainId === chain.id && t.symbol === chain.nativeCurrency.symbol)!,
    quantity: null,
    balanceUSD: null,
    isNative: true,
    price: null
})