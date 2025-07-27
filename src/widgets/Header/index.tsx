import React from "react";
import { SidebarInterface } from "@/types/interface";
import { CurrencyItem } from "@/components/ui/CurrencyItem";
import arrow from "../../assets/icons/arrow_right.svg";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import "@/styles/header.scss";

export const Header: React.FC<SidebarInterface> = ({ setSidebarOpen }) => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { exchangeRate, currenciesToShow } = useExchangeRate();

  return (
    <header className="header">
      <button
        className="header__menu-button"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>
      <div className="header__left">
        <h2 className="header__left--title">Hello User</h2>
        <div className="header__left--date-container">
          <div className="flex items-center">
            <img src={arrow} alt="Icon" />
            <img src={arrow} alt="Icon" />
          </div>
          <span className="header__left--date-container-today">{today}</span>
        </div>
      </div>
      <div className="header__exchange--rate">
        {exchangeRate
          .filter((currency) => currenciesToShow.includes(currency.Ccy))
          .map((item) => (
            <CurrencyItem key={item.id} rate={item} />
          ))}
      </div>
    </header>
  );
};
