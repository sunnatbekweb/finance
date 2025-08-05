import axios from "axios";
import { Transaction } from "../types/types";

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/transactions/`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token") || ""
        )}`,
      },
    }
  );
  return response.data;
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/transactions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token") || ""
        )}`,
      },
    }
  );
  return response.data;
};

export const createTransaction = async (
  data: Omit<Transaction, "id">
): Promise<Transaction> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/transactions/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token") || ""
        )}`,
      },
    }
  );
  return response.data;
};

export const updateTransaction = async (
  id: number,
  data: Omit<Transaction, "id">
): Promise<Transaction> => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/transactions/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token") || ""
        )}`,
      },
    }
  );
  return response.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("access_token") || ""
      )}`,
    },
  });
};
