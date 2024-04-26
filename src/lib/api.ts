import axios from "axios";

interface PriceResponse {
  symbol: string;
  price: string;
}

export const getCoinPrice = async (symbol: string): Promise<number> => {
  const res = await axios.get<PriceResponse>(
    `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
  );
  return Number(res.data.price);
};
