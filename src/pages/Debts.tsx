import axios from "axios";
import { useState } from "react";

export const Debts = () => {
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

    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}/debts/`, formData, {
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
    <div className="w-1/2">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <label htmlFor="is_positive" className="flex flex-col gap-y-2">
          <span>Slect positive</span>
          <select
            name="is_positive"
            id="is_positive"
            onChange={handleChange}
            value={formData.is_positive}
          >
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
    </div>
  );
};
