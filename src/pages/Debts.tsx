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
import { refreshAccessToken } from "@/api/auth";
import axios from "axios";

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

  const closeModal = () => setModal(false);

  useEffect(() => {
    getDebts();
  }, []);

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
      if (error.response?.status === 401) {
        // ТОКЕН ПРОСРОЧЕН - обновляем
        try {
          const newAccessToken = await refreshAccessToken();
          const retryResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/debts/`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          setDebts(retryResponse.data);
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
        }
      } else {
        console.error(error);
      }
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
      alert("Created debt!");
      closeModal();
      getDebts();
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          const retryResponse = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/debts/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          console.log(retryResponse.data);
          alert("Created debt!");
          closeModal();
          getDebts();
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
        }
      } else {
        console.error(error);
      }
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
                <TableCell>{item.amount} so'm</TableCell>
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
                  <input
                    type="checkbox"
                    name="is_positive"
                    id="is_positive"
                    checked={item.is_positive}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Погашено</TableCell>
              <TableCell className="text-right">
                {totalRepaid?.toFixed(2)} so'm
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>Не погашено</TableCell>
              <TableCell className="text-right">
                {totalOutstanding?.toFixed(2)} so'm
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
