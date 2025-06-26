import { useEffect, useState } from "react";
import DashboardChart from "@/components/ui/chart/DashboardChart";
import { TransactionsList } from "@/types";
import axios from "axios";

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionsList>();
  async function getTransactions() {
    let token = JSON.parse(localStorage.getItem("access_token") || "null");
    if (!token) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transactions/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response?.data);
    } catch (error: any) {
      console.error(error);
    }
  }
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div>
      <div className="flex items-center gap-x-5">
        <h2 className="font-bold text-2xl">Dashboard</h2>
      </div>
      <div className="py-5">
        <DashboardChart data={transactions} />
      </div>
    </div>
  );
};
