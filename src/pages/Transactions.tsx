import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionsList } from "@/types";

export const Transactions = () => {
  const [formData, setFormData] = useState({
    transaction_type: "",
    amount: "",
    description: "",
  });
  const [transactions, setTransactions] = useState<TransactionsList>();
  const totalAmount = transactions?.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getDebts();
    console.log(transactions);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function getDebts() {
    if (token) {
      try {
        await axios
          .get(`${import.meta.env.VITE_BASE_URL}/transactions/`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => setTransactions(response.data));
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token) {
      try {
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}/transactions/`, formData, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => console.log(response.data));

        alert("Created transaction!");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="w-full flex flex-col">
      <form
        className="w-1/2 flex flex-col gap-y-5 mx-auto"
        onSubmit={handleSubmit}
      >
        <label htmlFor="transaction_type" className="flex flex-col gap-y-2">
          <span>Slect transaction type</span>
          <select
            name="transaction_type"
            id="transaction_type"
            onChange={handleChange}
            value={formData.transaction_type}
          >
            <option value="" disabled>
              Slect transaction type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label htmlFor="amount" className="flex flex-col gap-y-2">
          <span>Amount</span>
          <input
            type="text"
            name="amount"
            id="amount"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description" className="flex flex-col gap-y-2">
          <span>Description</span>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
          ></textarea>
        </label>
        <button className="py-2 text-white rounded bg-[#f8c023] hover:opacity-80 duration-300">
          Add transaction
        </button>
      </form>
      <div className="py-20 px-10">
        <h2 className="font-bold text-4xl text-center">Transactions</h2>
        <div>
          <Table>
            <TableCaption>A list of transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.transaction_type}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {new Date(transaction?.date ?? "").toLocaleDateString(
                      "ru-RU",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    ${transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  ${totalAmount?.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};
