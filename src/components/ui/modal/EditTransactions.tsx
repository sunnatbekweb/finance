import { EditTransactionProps } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const EditTransactions: React.FC<EditTransactionProps> = ({
  id,
  modal,
  onClose,
  submit,
}) => {
  const [formData, setFormData] = useState({
    transaction_type: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("access_token") || "null");

    if (!token || !id) return;

    try {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/transactions/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setFormData(response.data));
    } catch (error: any) {
      console.error(error);
    }
  }, [id, modal]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(formData);
    setFormData({
      transaction_type: "",
      amount: "",
      description: "",
    });
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`${
          modal ? "visible opacity-100" : "collapse opacity-0"
        } duration-300 fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10`}
      ></div>

      <form
        onSubmit={handleSubmit}
        className={`${
          modal
            ? "visible opacity-100 scale-100"
            : "collapse opacity-0 scale-50"
        } fixed top-1/2 left-1/2 -translate-1/2 rounded-md bg-white px-5 py-8 md:p-10 w-[90%] sm:w-[80%] md:w-1/2 flex flex-col gap-y-5 mx-auto z-20 duration-300`}
      >
        <label htmlFor="transaction_type" className="flex flex-col gap-y-2">
          <span>Select transaction type</span>
          <select
            name="transaction_type"
            id="transaction_type"
            onChange={handleChange}
            value={formData.transaction_type}
          >
            <option value="" disabled>
              Select transaction type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label htmlFor="amount" className="flex flex-col gap-y-2">
          <span>Amount</span>
          <input
            type="number"
            name="amount"
            id="amount"
            onChange={handleChange}
            value={formData.amount}
          />
        </label>

        <label htmlFor="description" className="flex flex-col gap-y-2">
          <span>Description</span>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </label>

        <button className="py-2 text-white rounded bg-[#f8c023] hover:opacity-80 duration-300">
          Submit
        </button>
      </form>
    </>
  );
};
