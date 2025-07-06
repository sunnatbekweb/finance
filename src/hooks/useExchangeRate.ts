import { useState, useEffect } from "react";
import { ExchangeRate } from "@/types/interface";
import axios from "axios";

export const useExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const currenciesToShow = ["USD", "EUR", "RUB"];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_EXCHANGE_RATE_API}`
        );
        setExchangeRate(response.data);
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return { exchangeRate, currenciesToShow, loading, error };
};
