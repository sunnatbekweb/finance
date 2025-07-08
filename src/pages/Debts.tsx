import { useEffect, useState } from "react";
import { DebtsList } from "@/types/type";
import { DebtModal } from "@/components/ui/modal/DebtModal";
import { EditDebt } from "@/components/ui/modal/EditDebt";
import { DebtsTable } from "@/components/ui/table/DebtsTable";
import { toast } from "react-toastify";
import axios from "axios";
import { formatNumberWithSpaces } from "@/hooks/useNumberFormatter";

export const Debts = () => {
  const [debts, setDebts] = useState<DebtsList>();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [debtId, setDebtId] = useState<number | null>(null);

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
      setDebts(response.data.reverse());
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

  const totalDebts = debts
    ? debts
        .filter((debt) => debt.is_positive === false)
        .reduce((sum, debt) => sum + Number(debt.amount), 0)
    : 0;

  useEffect(() => {
    getDebts();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-5">
          <h2 className="font-bold text-2xl text-center">Debts</h2>
        </div>
        <DebtModal modal={modal} onClose={closeModal} submit={handleSubmit} />
        <div className="flex items-center gap-x-10">
          <div className="flex items-center gap-x-1 font-medium">
            <span>Remaining debts:</span>
            <span className="text-yellow-400">
              {formatNumberWithSpaces(totalDebts)} UZS
            </span>
          </div>
          <button
            onClick={() => setModal(true)}
            className="py-2 px-4 text-white text-xs rounded bg-[#f8c023] hover:opacity-80 duration-300"
          >
            Add debt
          </button>
        </div>
      </div>
      <EditDebt
        id={debtId}
        modal={editModal}
        onClose={closeEditModal}
        submit={handleEdit}
      />
      <div className="overflow-x-auto">
        <DebtsTable
          debts={debts}
          onDelete={handleDelete}
          onEdit={(id) => {
            setDebtId(id);
            setEditModal(true);
          }}
        />
      </div>
    </div>
  );
};
