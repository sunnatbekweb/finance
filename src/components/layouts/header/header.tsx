import React, { useEffect, useState } from "react";
import axios from "axios";
import arrow from "../../../assets/icons/arrow_right.svg";
import usa from "../../../assets/icons/usa.svg";
import eur from "../../../assets/icons/eur.svg";
import rus from "../../../assets/icons/rus.svg";
import "@/styles/header.scss";

interface Props {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ExchangeRate {
  id: number;
  Ccy: string;
  Rate: string;
  Diff: string;
}

export const Header: React.FC<Props> = ({ setSidebarOpen }) => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate[]>([]);

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
          .filter((currency) => currency.Ccy === "USD")
          .map((item) => (
            <div key={item.id} className="header__exchange--rate-item">
              <div className="image-container">
                <img src={usa} alt="Flag usa" />
              </div>
              <div>
                <p className="font-bold text-[0.875rem] mb-1">
                  {item.Rate} UZS
                </p>
                <div className="flex items-center gap-x-2 text-[0.75rem]">
                  <span className="text-black/60">{item.Ccy}</span>
                  <div className="flex items-center gap-x-1">
                    <div
                      className={`${
                        item.Diff > "0" ? "-rotate-90" : "rotate-90"
                      }`}
                    >
                      <svg
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke={`${item.Diff > "0" ? "#16cc23" : "#ff0000"}`}
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      className={`${
                        item.Diff > "0" ? "text-[#16cc23]" : "text-[#ff0000]"
                      }`}
                    >
                      {item.Diff}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {exchangeRate
          .filter((currency) => currency.Ccy === "EUR")
          .map((item) => (
            <div key={item.id} className="header__exchange--rate-item">
              <div className="image-container">
                <img src={eur} alt="Flag usa" />
              </div>
              <div className="">
                <span className="font-bold text-[0.875rem] mb-1">
                  {item.Rate} UZS
                </span>
                <div className="flex items-center gap-x-2 text-[0.75rem]">
                  <span className="text-black/60">{item.Ccy}</span>
                  <div className="flex items-center gap-x-1">
                    <div
                      className={`${
                        item.Diff > "0" ? "-rotate-90" : "rotate-90"
                      }`}
                    >
                      <svg
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke={`${item.Diff > "0" ? "#16cc23" : "#ff0000"}`}
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      className={`${
                        item.Diff > "0" ? "text-[#16cc23]" : "text-[#ff0000]"
                      }`}
                    >
                      {item.Diff}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {exchangeRate
          .filter((currency) => currency.Ccy === "RUB")
          .map((item) => (
            <div key={item.id} className="header__exchange--rate-item">
              <div className="image-container">
                <img src={rus} alt="Flag usa" />
              </div>
              <div className="">
                <span className="font-bold text-[0.875rem] mb-1">
                  {item.Rate} UZS
                </span>
                <div className="flex items-center gap-x-2 text-[0.75rem]">
                  <span className="text-black/60">{item.Ccy}</span>
                  <div className="flex items-center gap-x-1">
                    <div
                      className={`${
                        item.Diff > "0" ? "-rotate-90" : "rotate-90"
                      }`}
                    >
                      <svg
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke={`${item.Diff > "0" ? "#16cc23" : "#ff0000"}`}
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      className={`${
                        item.Diff > "0" ? "text-[#16cc23]" : "text-[#ff0000]"
                      }`}
                    >
                      {item.Diff}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </header>
  );
};
