import React, { useState } from "react";
import { ModalProps } from "@/types";
import axios from "axios";

export const TransactionModal: React.FC<ModalProps> = ({ modal, onClose }) => {
  const [formData, setFormData] = useState({
    transaction_type: "",
    amount: "",
    description: "",
  });
  const token = localStorage.getItem("access_token");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token) {
      try {
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}/transactions/`, formData, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => console.log(response.data));

        alert("Created transaction!");
      } catch (error) {
        console.error(error);
      }
    }
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
        className={`${
          modal
            ? "visible opacity-100 scale-100"
            : "collapse opacity-0 scale-50"
        } fixed top-1/2 left-1/2 -translate-1/2 rounded-md bg-white p-10 w-1/2 flex flex-col gap-y-5 mx-auto z-20 duration-300`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="transaction_type" className="flex flex-col gap-y-2">
          <span>Slect transaction type</span>
          <select
            name="transaction_type"
            id="transaction_type"
            onChange={handleChange}
            value={formData.transaction_type}
          >
            <option value="" disabled>
              Slect transaction type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label htmlFor="amount" className="flex flex-col gap-y-2">
          <span>Amount</span>
          <input
            type="text"
            name="amount"
            id="amount"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description" className="flex flex-col gap-y-2">
          <span>Description</span>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
          ></textarea>
        </label>
        <button className="py-2 text-white rounded bg-[#f8c023] hover:opacity-80 duration-300">
          Add transaction
        </button>
      </form>
    </>
  );
};
