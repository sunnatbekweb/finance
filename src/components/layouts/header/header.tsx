import React from "react";
import arrow from "../../../assets/icons/arrow_right.svg";
import "@/styles/header.scss";

interface Props {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ setSidebarOpen }) => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <button
        className="header__menu-button"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>
      <h2 className="header__title">Hello User</h2>
      <div className="header__date--container">
        <div className="flex items-center">
          <img src={arrow} alt="Icon" />
          <img src={arrow} alt="Icon" />
        </div>
        <span className="header__date--container-today">{today}</span>
      </div>
    </header>
  );
};
