import axios from "axios";
import { useEffect, useState } from "react";
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
import { TransactionModal } from "@/components/ui/modal/TransactionModal";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionsList>();
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem("access_token");
  const totalAmount = transactions?.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const closeModal = () => setModal(false);

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
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
  const handleSubmit = async (formData: {
    transaction_type: string;
    amount: string;
    description: string;
  }) => {
    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/transactions/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        alert("Created transaction!");
        closeModal();
        getTransactions();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <h2 className="font-bold text-2xl text-center">Transactions</h2>
        <TransactionModal
          modal={modal}
          onClose={closeModal}
          submit={handleSubmit}
        />
        <button
          onClick={() => setModal(true)}
          className="py-2 px-4 text-white text-xs rounded bg-[#f8c023] hover:opacity-80 duration-300"
        >
          Add transaction
        </button>
      </div>
      <div>
        <Table>
          <TableCaption>A list of transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  {transaction.transaction_type === "income" ? "+" : "-"}
                  {transaction.amount} so'm
                </TableCell>
                <TableCell className="text-center">
                  {transaction.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-2">
                    <span>
                      {new Date(transaction?.date ?? "").toLocaleDateString(
                        "ru-RU",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
                    {"|"}
                    <span>
                      {new Date(transaction.date).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
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
  );
};
