import React from "react";
import { Table, Tag, Space } from "antd";
import type { TableProps } from "antd";
import type { Transaction } from "@/types/type";
import { format } from "date-fns";

interface TransactionsTableProps {
  transactions?: Transaction[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onDelete,
  onEdit,
}) => {
  const columns: TableProps<Transaction>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <span
          className={
            record.transaction_type === "expense"
              ? "text-red-500"
              : "text-green-600"
          }
        >
          {record.transaction_type === "expense" ? "-" : "+"}
          {record.amount}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <span>{format(new Date(date), "dd.MM.yyyy HH:mm")}</span>
      ),
    },
    {
      title: "Transaction Type",
      key: "transaction_type",
      dataIndex: "transaction_type",
      render: (type: string) => (
        <Tag color={type === "income" ? "green" : "red"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => onDelete(record.id)} className="text-red-500">
            Delete
          </button>
          <button onClick={() => onEdit(record.id)} className="text-yellow-500">
            Edit
          </button>
        </Space>
      ),
    },
  ];

  return (
    <Table<Transaction>
      rowKey="id"
      columns={columns}
      dataSource={transactions}
    />
  );
};
