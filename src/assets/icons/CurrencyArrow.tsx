import React from "react";

interface DiffType {
  Diff: string;
}

export const CurrencyArrow: React.FC<DiffType> = ({ Diff }) => {
  return (
    <div className={`${Diff > "0" ? "-rotate-90" : "rotate-90"}`}>
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 11L6 6L1 1"
          stroke={`${Diff > "0" ? "#16cc23" : "#ff0000"}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
