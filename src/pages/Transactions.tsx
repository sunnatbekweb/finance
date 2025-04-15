import axios from "axios";
import React, { useState } from "react";

export const Transactions = () => {
  const [formData, setFormData] = useState({
    transaction_type: "",
    amount: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios
        .post(`https://fin12.onesystem.uz/api/v1/transactions/`, formData)
        .then((response) => console.log(response.data));

      alert("Created transaction!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-1/2">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <label htmlFor="transaction_type" className="flex flex-col gap-y-2">
          <span>Transaction type</span>
          <input
            type="text"
            name="transaction_type"
            id="transaction_type"
            onChange={handleChange}
          />
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
    </div>
  );
};
