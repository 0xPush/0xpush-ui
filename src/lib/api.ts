import axios from "axios";

interface SolPriceResponse {
  symbol: string;
  price: string;
}

export const getEthPrice = async (): Promise<number> => {
  const res = await axios.get<SolPriceResponse>(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
  );
  return Number(res.data.price);
};

// export const createPreset = async (preset: Preset): Promise<any> => {
//   return await axios.post<any>("/api/push", preset);
// };

// export const getPreset = async (publicKey: string): Promise<Preset> => {
//   const res = await axios.get<Preset>("/api/push", {
//     params: { pk: publicKey },
//   });
//   return res.data;
// };

// export const getNfts = async (publicKey: string): Promise<NftItem[]> => {
//   const res = await axios.get<any>("/api/nft", { params: { pk: publicKey } });
//   return res.data;
// };

// export const getOrcaPools = async (): Promise<OrcaPoolsResponse> => {
//   const res = await axios.get<any>("https://api.orca.so/allPools");
//   return res.data;
// };
