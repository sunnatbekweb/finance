import { useEffect, useState } from "react";
import { TransactionsList } from "@/types/type";
import { TransactionModal } from "@/components/ui/modal/TransactionModal";
import { EditTransactions } from "@/components/ui/modal/EditTransactions";
import { TransactionsTable } from "@/components/ui/table/TransactionTable";
import { toast } from "react-toastify";
import axios from "axios";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionsList>();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [transactionId, setTranactionId] = useState<number | null>(null);

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
      closeEditModal();
      getTransactions();
    } catch (error: any) {
      toast.error(
        `Error editing transaction: ${
          error?.response?.statusText || "Unknown error"
        }`
      );
    }
  };

  const totalIncomeAmount = transactions
    ? transactions
        .filter((transaction) => transaction.transaction_type === "income")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0)
    : 0;

  const totalExpenseAmount = transactions
    ? transactions
        .filter((transaction) => transaction.transaction_type === "expense")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0)
    : 0;

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-5">
          <h2 className="font-bold text-base sm:text-lg md:text-2xl text-center">
            Transactions
          </h2>
        </div>
        <TransactionModal
          modal={modal}
          onClose={closeModal}
          submit={handleSubmit}
        />
        <div className="flex items-center gap-x-10">
          <div className="flex items-center gap-x-5 font-medium">
            <div className="text-sm text-gray-700">
              <span>Total income:</span>{" "}
              <span className="text-green-500">+{totalIncomeAmount}</span>
            </div>
            <div className="text-sm text-gray-700">
              <span>Total expence:</span>{" "}
              <span className="text-red-500">-{totalExpenseAmount}</span>
            </div>
          </div>
          <button
            onClick={() => setModal(true)}
            className="py-2 px-4 text-white text-xs rounded bg-[#f8c023] hover:opacity-80 duration-300"
          >
            Add transaction
          </button>
        </div>
      </div>
      <EditTransactions
        id={transactionId}
        modal={editModal}
        onClose={closeEditModal}
        submit={handleEdit}
      />
      <div>
        <TransactionsTable
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={(id) => {
            setTranactionId(id);
            setEditModal(true);
          }}
        />
      </div>
    </div>
  );
};
