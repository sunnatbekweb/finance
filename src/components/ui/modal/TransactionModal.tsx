import React, { useEffect, useState } from "react";
import { CategoryList, ModalProps } from "@/types/type";
import axios from "axios";
import { Modal } from "antd";

export const TransactionModal: React.FC<ModalProps> = ({
  modal,
  onClose,
  submit,
}) => {
  const [formData, setFormData] = useState({
    transaction_type: "",
    category: "",
    amount: "",
    description: "",
  });
  const [category, setCategory] = useState<CategoryList>();
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
      category: "",
      amount: "",
      description: "",
    });
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/category`
      );
      setCategory(response.data);
    } catch (errorr) {
      console.error(errorr);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Modal
        title="Create transaction"
        centered
        open={modal}
        onOk={onClose}
        onCancel={onClose}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-y-5 pt-3 mx-auto`}
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
          <label htmlFor="category" className="flex flex-col gap-y-2">
            <span>Select category</span>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={formData.category}
            >
              <option value="" disabled>
                Select category
              </option>
              {category?.map((_) => (
                <option key={_?.id} value={_?.id}>
                  {_?.name}
                </option>
              ))}
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
            Add transaction
          </button>
        </form>
      </Modal>
    </>
  );
};
