export type TokenListItem = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions: {
      opListId?: "default" | "extended";
  };
}

export type TokenOption = {
  token: TokenListItem;
  quantity: number | null; // on balance
  balanceUSD: number | null;
  price: number | null;
  isNative: boolean;
}