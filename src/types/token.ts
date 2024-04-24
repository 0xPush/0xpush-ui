export type TokenListItem = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  isNative: boolean;
};

export type TokenOption = {
  token: TokenListItem;
  quantity: bigint;
  balanceUSD: number | null;
  price: number | null;
  isNative: boolean;
};
