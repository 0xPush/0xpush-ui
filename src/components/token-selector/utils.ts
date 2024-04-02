import { TokenListItem, TokenOption } from "./types";
import tokenList from './token-list.json'

export const getDefaultToken = (chainId: number): TokenOption => {
    return {
        token: (tokenList as unknown as TokenListItem[]).find(t => t.chainId === chainId)!,
        quantity: null,
        balanceUSD: null,
        isNative: true,
        price: null
    }
}