export interface Transaction {
  id: number;
  category: number;
  transaction_type: "income" | "expense";
  description: string;
  amount: string;
}
