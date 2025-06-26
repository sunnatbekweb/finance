import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "@/styles/sidbar.scss";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
              to={"/"}
              className={`sidebar__top--nav-item ${
                location.pathname === "/" && "active"
              }`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to={"/transactions"}
              className={`sidebar__top--nav-item ${
                location.pathname === "/transactions" && "active"
              }`}
            >
              Transactions
            </NavLink>
            <NavLink
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
