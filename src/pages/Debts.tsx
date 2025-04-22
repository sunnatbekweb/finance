import { useEffect, useState } from "react";
import { DebtModal } from "@/components/ui/modal/DebtModal";
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
import { DebtsList } from "@/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import { Delete, Edit } from "lucide-react";
import { Loader } from "@/components/ui/loader/Loader";
import { formatNumberWithSpaces } from "@/hooks/number-formatter";

export const Debts = () => {
  const [debts, setDebts] = useState<DebtsList>();
  const [modal, setModal] = useState(false);
  const totalRepaid = debts?.reduce((acc, curr) => {
    if (curr.is_positive) {
      return acc + Number(curr.amount);
    }
    return acc;
  }, 0);
  const totalOutstanding = debts?.reduce((acc, curr) => {
    if (!curr.is_positive) {
      return acc + Number(curr.amount);
    }
    return acc;
  }, 0);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    getDebts();
  }, []);
  const closeModal = () => setModal(false);
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
      toast.error(`Error creating debt: ${error.message}`);
    }
  };
  const handleDelete = async (id: number) => {
    const token = JSON.parse(localStorage.getItem("access_token") || "null");

    if (!token) return;

    try {
      setLoadingId(id);
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/debts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getDebts();
      toast.success("Deleted transaction!");
    } catch (error) {
      console.error(error);
      toast.error("Error when deleting!");
    } finally {
      setLoadingId(null);
    }
  };
  const handlePatch = async (id: number, is_positive: boolean) => {
    const token = JSON.parse(localStorage.getItem("access_token") || "null");

    if (!token) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/debts/${id}/`,
        { is_positive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getDebts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-5">
          <SidebarTrigger />
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
      <ToastContainer />
      <div>
        <Table>
          <TableCaption>A list of debts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Is positive</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{formatNumberWithSpaces(item.amount ?? 0)} so'm</TableCell>
                <TableCell className="text-center">
                  {item.description}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-x-2">
                    <span>
                      {new Date(item?.date ?? "").toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                    {" | "}
                    <span>
                      {new Date(item.date).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    role="button"
                    onClick={() => handlePatch(item.id, !item.is_positive)}
                    className="flex items-center justify-end space-x-2"
                  >
                    <Checkbox id={String(item.id)} checked={item.is_positive} />
                    <label
                      htmlFor={String(item.id)}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Returned
                    </label>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <TableCell className="text-right flex gap-x-3.5 justify-end">
                    <button className="edit_button">
                      <Edit />
                    </button>
                    <button
                      className="delete_button"
                      onClick={() => handleDelete(item.id)}
                    >
                      {loadingId === item.id ? <Loader /> : <Delete />}
                    </button>
                  </TableCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Погашено</TableCell>
              <TableCell className="text-right text-green-500">
                {formatNumberWithSpaces(totalRepaid ?? 0)} so'm
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>Не погашено</TableCell>
              <TableCell className="text-right text-red-500">
                {formatNumberWithSpaces(totalOutstanding ?? 0)} so'm
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
