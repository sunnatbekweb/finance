import React, { useEffect } from "react";
import { Table, Tag, Space } from "antd";
import type { TableProps } from "antd";
import type { Transaction } from "../types/types";
import { formatNumberWithSpaces } from "@/hooks/useNumberFormatter";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchTransactions, removeTransaction } from "../model/slice";

export const TransactionsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );
  console.log(transactions, loading, error);
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
          className={`font-medium whitespace-nowrap ${
            record.transaction_type === "expense"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {record.transaction_type === "expense" ? "-" : "+"}
          {formatNumberWithSpaces(record.amount)} UZS
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <span className="whitespace-nowrap">
          {format(new Date(date), "dd.MM.yyyy HH:mm")}
        </span>
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
          <button
            onClick={() => dispatch(removeTransaction(record.id))}
            className="text-red-500"
          >
            Delete
          </button>
          <button className="text-yellow-500">Edit</button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <Table
      rowKey="id"
      columns={columns}
      pagination={{ hideOnSinglePage: true }}
      dataSource={transactions}
    />
  );
};
