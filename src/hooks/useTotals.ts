import { Transaction, Debt } from "@/types/type";

// Calculate tranactions total
export function useTransactionTotals(transactions?: Transaction[]) {
  const totalIncome =
    transactions?.reduce((acc, curr) => {
      if (curr.transaction_type === "income") {
        return acc + Number(curr.amount);
      }
      return acc;
    }, 0) ?? 0;

  const totalExpense =
    transactions?.reduce((acc, curr) => {
      if (curr.transaction_type === "expense") {
        return acc + Number(curr.amount);
      }
      return acc;
    }, 0) ?? 0;

  return {
    totalIncome,
    totalExpense,
  };
}

// Calculate debts total
export function useDebtTotals(debts?: Debt[]) {
  const totalRepaid =
    debts?.reduce((acc, curr) => {
      if (curr.is_positive) {
        return acc + Number(curr.amount);
      }
      return acc;
    }, 0) ?? 0;

  const totalOutstanding =
    debts?.reduce((acc, curr) => {
      if (!curr.is_positive) {
        return acc + Number(curr.amount);
      }
      return acc;
    }, 0) ?? 0;

  return {
    totalRepaid,
    totalOutstanding,
  };
}
