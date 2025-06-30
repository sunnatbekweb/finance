import React from "react";
import { Space, Table, Tag } from "antd";
import type { Debt } from "@/types/type";
import type { TableProps } from "antd";
import { format } from "date-fns";

interface DebtsTableProps {
  debts?: Debt[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const DebtsTable: React.FC<DebtsTableProps> = ({
  debts,
  onDelete,
  onEdit,
}) => {
  const columns: TableProps<Debt>["columns"] = [
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
      render: (_, record) => <span>{record.amount}</span>,
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
      title: "Is positive?",
      key: "is_positive",
      dataIndex: "is_positive",
      render: (type: boolean) => (
        <Tag color={type === true ? "green" : "red"}>
          {type === true ? "True" : "Flase"}
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
  return <Table<Debt> rowKey="id" columns={columns} dataSource={debts} />;
};
