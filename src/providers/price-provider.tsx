import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCoinPrice } from "../lib/api";

interface PriceContextValue {
  ethPriceUsd: number;
}

export const PriceContext = createContext<PriceContextValue>({
  ethPriceUsd: 0,
});
export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [ethPriceUsd, setEthPriceUsd] = useState(0);
  useEffect(() => {
    getCoinPrice("ETHUSDT").then((price) => setEthPriceUsd(price));
  }, []);

  return (
    <PriceContext.Provider value={{ ethPriceUsd }}>
      {children}
    </PriceContext.Provider>
  );
};
