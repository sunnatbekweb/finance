export type Transaction = {
  id: number;
  transaction_type: string;
  description: string;
  amount: string;
  date: string;
};

export type TransactionsList = Transaction[];
