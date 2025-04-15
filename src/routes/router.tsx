import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { Transactions } from "../pages/Transactions";
import { Debts } from "../pages/Debts";
import { Dashboard } from "../pages/Dashboard";

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
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
