import { TokenListItem, TokenOption } from "types/token";
import tokenList from './token-list.json'
import { Chain } from "viem";

export const getTokenOptionList = (chain: Chain): TokenOption[] => (tokenList as unknown as TokenListItem[]).filter(t => t.chainId === chain.id).map(token => ({token, quantity: null, balanceUSD: null, isNative: token.symbol === chain.nativeCurrency.symbol, price: null}))

export const getDefaultNativeToken = (chain: Chain): TokenOption => getTokenOptionList(chain).find(t => t.isNative)!;