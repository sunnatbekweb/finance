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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { refreshAccessToken } from "@/api/auth";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionsList>();
  const [modal, setModal] = useState(false);
  const totalAmount = transactions?.reduce((acc, curr) => {
    if (curr.transaction_type === "income") {
      return acc + Number(curr.amount);
    }
    return acc;
  }, 0);

  const closeModal = () => setModal(false);

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    let token = JSON.parse(localStorage.getItem("access_token") || "null");

    if (!token) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transactions/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          const retryResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/transactions/`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          setTransactions(retryResponse.data);
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
        }
      } else {
        console.error(error);
      }
    }
  }

  const handleSubmit = async (formData: {
    transaction_type: string;
    amount: string;
    description: string;
  }) => {
    let token = JSON.parse(localStorage.getItem("access_token") || "null");

    if (!token) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transactions/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Created transaction!");
      closeModal();
      getTransactions();
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/transactions/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          alert("Created transaction!");
          closeModal();
          getTransactions();
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-5">
          <SidebarTrigger />
          <h2 className="font-bold text-2xl text-center">Transactions</h2>
        </div>
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
                {totalAmount?.toFixed(2)} so'm
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
