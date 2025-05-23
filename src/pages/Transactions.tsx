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
import { toast, ToastContainer } from "react-toastify";
import { Delete, Edit } from "lucide-react";
import { Loader } from "@/components/ui/loader/Loader";
import { formatNumberWithSpaces } from "@/hooks/useNumberFormatter";
import { useTransactionTotals } from "@/hooks/useTotals";
import { EditTransactions } from "@/components/ui/modal/EditTransactions";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionsList>();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { totalIncome, totalExpense } = useTransactionTotals(transactions);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [transactionId, setTranactionId] = useState<number | null>(null);

  useEffect(() => {
    getTransactions();
  }, []);

  const closeModal = () => setModal(false);
  const closeEditModal = () => setEditModal(false);
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
      console.error(error);
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
      toast.success("Created transaction!");
      closeModal();
      getTransactions();
    } catch (error: any) {
      toast.error(
        `Error creating debt: ${error?.response?.statusText || "Unknown error"}`
      );
    }
  };
  const handleDelete = async (id: number) => {
    const token = JSON.parse(localStorage.getItem("access_token") || "null");

    if (!token) return;

    try {
      setLoadingId(id);
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/transactions/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getTransactions();
      toast.success("Deleted transaction!");
    } catch (error: any) {
      toast.error(
        `Error deleting transaction! ${
          error?.response?.statusText || "Unknown error"
        }`
      );
    } finally {
      setLoadingId(null);
    }
  };
  const handleEdit = async (formData: {
    transaction_type: string;
    amount: string;
    description: string;
  }) => {
    let token = JSON.parse(localStorage.getItem("access_token") || "null");

    if (!token) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/transactions/${transactionId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Edited transaction!");
      closeModal();
      getTransactions();
    } catch (error: any) {
      toast.error(
        `Error editing transaction: ${
          error?.response?.statusText || "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-5">
          <SidebarTrigger />
          <h2 className="font-bold text-base sm:text-lg md:text-2xl text-center">
            Transactions
          </h2>
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
      <ToastContainer />
      <EditTransactions
        id={transactionId}
        modal={editModal}
        onClose={closeEditModal}
        submit={handleEdit}
      />
      <div>
        <Table>
          <TableCaption>A list of transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  {transaction.transaction_type === "income" ? "+" : "-"}
                  {formatNumberWithSpaces(transaction.amount)} so'm
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
                <TableCell className="text-right flex gap-x-3.5 justify-end">
                  <button
                    className="edit_button"
                    onClick={() => {
                      setTranactionId(transaction.id), setEditModal(true);
                    }}
                  >
                    <Edit />
                  </button>
                  <button
                    className="delete_button"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    {loadingId === transaction.id ? <Loader /> : <Delete />}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Поступление</TableCell>
              <TableCell className="text-right text-green-500">
                +{formatNumberWithSpaces(totalIncome ?? 0)} so'm
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>Расход</TableCell>
              <TableCell className="text-right text-red-500">
                -{formatNumberWithSpaces(totalExpense ?? 0)} so'm
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
