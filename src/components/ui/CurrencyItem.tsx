import usa from "../../assets/icons/usa.svg";
import eur from "../../assets/icons/eur.svg";
import rus from "../../assets/icons/rus.svg";
import { ExchangeRate } from "@/types/interface";
import { CurrencyArrow } from "@/assets/icons/CurrencyArrow";

const currencyFlags: Record<string, string> = {
  USD: usa,
  EUR: eur,
  RUB: rus,
};

export const CurrencyItem: React.FC<{ rate: ExchangeRate }> = ({ rate }) => (
  <div key={rate.id} className="header__exchange--rate-item">
    <div className="image-container">
      <img src={currencyFlags[rate.Ccy]} alt={`Flag ${rate.Ccy}`} />
    </div>
    <div>
      <p className="font-bold text-[0.875rem] mb-1">{rate.Rate} UZS</p>
      <div className="flex items-center gap-x-2 text-[0.75rem]">
        <span className="text-black/60">{rate.Ccy}</span>
        <div className="flex items-center gap-x-1">
          <CurrencyArrow Diff={rate.Diff} />
          <span
            className={
              parseFloat(rate.Diff) > 0 ? "text-[#16cc23]" : "text-[#ff0000]"
            }
          >
            {rate.Diff}
          </span>
        </div>
      </div>
    </div>
  </div>
);
