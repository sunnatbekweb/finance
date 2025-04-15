import axios from "axios";
import { useState } from "react";

export const Debts = () => {
  const [formData, setFormData] = useState({
    is_positive: Boolean,
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

    try {
      await axios
        .post(`https://fin12.onesystem.uz/api/v1/debts/`, formData)
        .then((response) => console.log(response.data));

      alert("Created transaction!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-1/2">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <label htmlFor="is_positive" className="flex flex-col gap-y-2">
          <span>Slect positive</span>
          <select name="is_positive" id="is_positive" onChange={handleChange}>
            <option value="0" disabled>
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
