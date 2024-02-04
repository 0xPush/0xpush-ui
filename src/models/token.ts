// export interface BalanceItem {
//   contract: string;
//   amount: number;
//   name: string;
// }

export interface Token {
  id: number;
  ticker: string;
  name: string;
  icon: string | null;
  contract: string | null;
  amount?: number | null;
  isEth: boolean;
}

export const ETHER_TOKEN = {
  id: 0,
  name: "ETH",
  ticker: "ETH",
  contract: null,
  icon: `https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628`,
  isEth: true,
};
