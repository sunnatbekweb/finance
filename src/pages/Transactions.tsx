import axios from "axios";
import { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Transaction, TransactionsList } from "@/types";
import { TransactionModal } from "@/components/ui/modal/TransactionModal";
import { toast } from "react-toastify";
import { EditTransactions } from "@/components/ui/modal/EditTransactions";
import { format } from "date-fns";

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

  const columns: TableProps<Transaction>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <span
          className={
            record.transaction_type === "expense"
              ? "text-red-500"
              : "text-green-600"
          }
        >
          {record.transaction_type === "expense" ? "-" : "+"}
          {record.amount}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <span>{format(new Date(date), "dd.MM.yyyy HH:mm")}</span>
      ),
    },
    {
      title: "Transaction Type",
      key: "transaction_type",
      dataIndex: "transaction_type",
      render: (type: string) => (
        <Tag color={type === "income" ? "green" : "red"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleDelete(record.id)}
            className="text-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setTranactionId(record.id), setEditModal(true);
            }}
            className="text-yellow-500"
          >
            Edit
          </button>
        </Space>
      ),
    },
  ];
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
        <button
          onClick={() => setModal(true)}
          className="py-2 px-4 text-white text-xs rounded bg-[#f8c023] hover:opacity-80 duration-300"
        >
          Add transaction
        </button>
      </div>
      <EditTransactions
        id={transactionId}
        modal={editModal}
        onClose={closeEditModal}
        submit={handleEdit}
      />
      <div>
        <Table<Transaction> columns={columns} dataSource={transactions} />
      </div>
    </div>
  );
};
