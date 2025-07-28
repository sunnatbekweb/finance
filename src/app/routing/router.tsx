import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignIn } from "@/pages/Auth/SignIn";
import { SignUp } from "@/pages/Auth/SignUp";
import { Dashboard } from "@/pages/Dashboard";
import { Transactions } from "@/pages/Transactions";
import { Debts } from "@/pages/Debts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "/debts", element: <Debts /> },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
