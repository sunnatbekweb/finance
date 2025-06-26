import { useEffect, useState } from "react";
import { DebtModal } from "@/components/ui/modal/DebtModal";
import { Debt, DebtsList } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";
import { EditDebt } from "@/components/ui/modal/EditDebt";
import { Space, Table, TableProps, Tag } from "antd";
import { format } from "date-fns";

export const Debts = () => {
  const [debts, setDebts] = useState<DebtsList>();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [debtId, setDebtId] = useState<number | null>(null);

  useEffect(() => {
    getDebts();
  }, []);
  const closeModal = () => setModal(false);
  const closeEditModal = () => setEditModal(false);
  async function getDebts() {
    let accessToken = JSON.parse(
      localStorage.getItem("access_token") || "null"
    );

    if (!accessToken) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/debts/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDebts(response.data);
    } catch (error: any) {
      console.error(error);
    }
  }
  const handleSubmit = async (formData: {
    is_positive: string;
    amount: string;
    description: string;
  }) => {
    let accessToken = JSON.parse(
      localStorage.getItem("access_token") || "null"
    );
    if (!accessToken) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/debts/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Created debt!");
      closeModal();
      getDebts();
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
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/debts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getDebts();
      toast.success("Deleted transaction!");
    } catch (error: any) {
      toast.error(
        `Error deleting debt: ${error?.response?.statusText || "Unknown error"}`
      );
    }
  };
  const handleEdit = async (formData: {
    is_positive: string;
    amount: string;
    description: string;
  }) => {
    let token = JSON.parse(localStorage.getItem("access_token") || "null");
    if (!token) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/debts/${debtId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Edited debt!");
      closeEditModal();
      getDebts();
    } catch (error: any) {
      toast.error(
        `Error editing debt: ${error?.response?.statusText || "Unknown error"}`
      );
    }
  };

  const columns: TableProps<Debt>["columns"] = [
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
      render: (_, record) => <span>{record.amount}</span>,
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
      title: "Is positive?",
      key: "is_positive",
      dataIndex: "is_positive",
      render: (type: boolean) => (
        <Tag color={type === true ? "green" : "red"}>
          {type === true ? "True" : "Flase"}
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
              setDebtId(record.id), setEditModal(true);
            }}
            className="text-yellow-500"
          >
            Edit
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-5">
          <h2 className="font-bold text-2xl text-center">Debts</h2>
        </div>
        <DebtModal modal={modal} onClose={closeModal} submit={handleSubmit} />
        <button
          onClick={() => setModal(true)}
          className="py-2 px-4 text-white text-xs rounded bg-[#f8c023] hover:opacity-80 duration-300"
        >
          Add debt
        </button>
      </div>
      <EditDebt
        id={debtId}
        modal={editModal}
        onClose={closeEditModal}
        submit={handleEdit}
      />
      <div className="overflow-x-auto">
        <Table<Debt> columns={columns} dataSource={debts} />
      </div>
    </div>
  );
};
