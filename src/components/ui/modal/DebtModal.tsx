import React, { useState } from "react";
import { DebtModalProps } from "@/types";

export const DebtModal: React.FC<DebtModalProps> = ({
  modal,
  onClose,
  submit,
}) => {
  const [formData, setFormData] = useState({
    is_positive: "",
    amount: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(formData);
    setFormData({
      is_positive: "",
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
        className={`${
          modal
            ? "visible opacity-100 scale-100"
            : "collapse opacity-0 scale-50"
        } fixed top-1/2 left-1/2 -translate-1/2 rounded-md bg-white px-5 py-8 md:p-10 w-[90%] sm:w-[80%] md:w-1/2 flex flex-col gap-y-5 mx-auto z-20 duration-300`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="is_positive" className="flex flex-col gap-y-2">
          <span>Slect positive</span>
          <select
            name="is_positive"
            id="is_positive"
            onChange={handleChange}
            value={formData.is_positive}
          >
            <option value="" disabled>
              Slect positive
            </option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <label htmlFor="amount" className="flex flex-col gap-y-2">
          <span>Amount</span>
          <input
            type="text"
            name="amount"
            id="amount"
            onChange={handleChange}
            value={formData.amount}
            required
          />
        </label>
        <label htmlFor="description" className="flex flex-col gap-y-2">
          <span>Description</span>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            required
          ></textarea>
        </label>
        <button className="py-2 text-white rounded bg-[#f8c023] hover:opacity-80 duration-300">
          Add transaction
        </button>
      </form>
    </>
  );
};
