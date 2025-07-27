import React, { useState } from "react";
import { DebtModalProps } from "@/types/type";
import { Modal } from "antd";

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
        className={`rounded-md flex flex-col gap-y-5 pt-3 mx-auto`}
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
            <option value="true">Qarz to'landi</option>
            <option value="false">Qarz olindi</option>
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
          Add debt
        </button>
      </form>
    </Modal>
  );
};
