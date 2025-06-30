import React, { useEffect, useState } from "react";
import { ExchangeRate, SidebarInterface } from "@/types/interface";
import { CurrencyItem } from "@/components/ui/CurrencyItem";
import arrow from "../../../assets/icons/arrow_right.svg";
import axios from "axios";
import "@/styles/header.scss";

export const Header: React.FC<SidebarInterface> = ({ setSidebarOpen }) => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate[]>([]);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getExchangeRate = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_EXCHANGE_RATE_API}`
      );
      setExchangeRate(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  const currenciesToShow = ["USD", "EUR", "RUB"];

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
