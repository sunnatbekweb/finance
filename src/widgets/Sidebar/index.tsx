import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { CurrencyItem } from "@/components/ui/CurrencyItem";
import "@/styles/sidbar.scss";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { exchangeRate, currenciesToShow } = useExchangeRate();
  const onLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen && "sidebar-open"}`}>
        <div className="sidebar__top">
          <div className="sidebar__top--header">
            <h1>O.S.finance</h1>
          </div>
          <nav className="sidebar__top--nav">
            <NavLink
              onClick={() => setSidebarOpen(false)}
              to={"/"}
              className={`sidebar__top--nav-item ${
                location.pathname === "/" && "active"
              }`}
            >
              Dashboard
            </NavLink>
            <NavLink
              onClick={() => setSidebarOpen(false)}
              to={"/transactions"}
              className={`sidebar__top--nav-item ${
                location.pathname === "/transactions" && "active"
              }`}
            >
              Transactions
            </NavLink>
            <NavLink
              onClick={() => setSidebarOpen(false)}
              to={"/debts"}
              className={`sidebar__top--nav-item ${
                location.pathname === "/debts" && "active"
              }`}
            >
              Debts
            </NavLink>
          </nav>
        </div>
        <div className="sidebar__footer">
          <div className="sidebar__footer--exchangeRate">
            {exchangeRate
              .filter((currency) => currenciesToShow.includes(currency.Ccy))
              .map((item) => (
                <CurrencyItem key={item.id} rate={item} />
              ))}
          </div>
          <button onClick={() => onLogout()}>Log out</button>
        </div>
      </aside>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`w-full h-full absolute top-0 left-0 bg-black/70 z-[1] backdrop:blur-md duration-150 ${
          sidebarOpen ? "visible opacity-100" : "collapse opacity-0"
        }`}
      ></div>
    </>
  );
};
