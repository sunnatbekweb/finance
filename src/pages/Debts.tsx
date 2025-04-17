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
import axios from "axios";

export const Debts = () => {
  const [debts, setDebts] = useState<DebtsList>();
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem("access_token");
  const totalAmount = debts?.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const closeModal = () => setModal(false);

  useEffect(() => {
    getDebts();
  }, []);

  async function getDebts() {
    if (token) {
      try {
        await axios
          .get(`${import.meta.env.VITE_BASE_URL}/debts/`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => setDebts(response.data));
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleSubmit = async (formData: {
    is_positive: string;
    amount: string;
    description: string;
  }) => {
    if (token) {
      if (token) {
        try {
          await axios
            .post(`${import.meta.env.VITE_BASE_URL}/debts/`, formData, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => console.log(response.data));
          alert("Created debt!");
          closeModal();
          getDebts();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="w-full p-10">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <h2 className="font-bold text-2xl text-center">Debts</h2>
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
              <TableHead>Amount</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Is positive</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>${item.amount}</TableCell>
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
                    {"|"}
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
                    checked={item.is_positive ? true : false}
                  />
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
