import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type Currency = "UZS" | "USD" | "RUB";

const CURRENCY_KEY = "hamyon_currency";

interface CurrencyOption {
  code: Currency;
  symbol: string;
  name: { en: string; ru: string; uz: string };
  flag: string;
}

const currencies: CurrencyOption[] = [
  { code: "UZS", symbol: "so'm", name: { en: "Uzbek Som", ru: "Узбекский сум", uz: "O'zbek so'mi" }, flag: "🇺🇿" },
  { code: "USD", symbol: "$", name: { en: "US Dollar", ru: "Доллар США", uz: "AQSH dollari" }, flag: "🇺🇸" },
  { code: "RUB", symbol: "₽", name: { en: "Russian Ruble", ru: "Российский рубль", uz: "Rossiya rubli" }, flag: "🇷🇺" },
];

export function getCurrency(): Currency {
  const stored = localStorage.getItem(CURRENCY_KEY);
  return (stored as Currency) || "UZS";
}

export function getCurrencySymbol(): string {
  const currency = getCurrency();
  return currencies.find(c => c.code === currency)?.symbol || "so'm";
}

export function CurrencySettings() {
  const { language } = useLanguage();
  const [currency, setCurrencyState] = useState<Currency>(getCurrency);

  const setCurrency = (code: Currency) => {
    setCurrencyState(code);
    localStorage.setItem(CURRENCY_KEY, code);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {currencies.map((item) => {
        const isActive = currency === item.code;
        
        return (
          <button
            key={item.code}
            onClick={() => setCurrency(item.code)}
            className={cn(
              "w-full flex items-center justify-between p-4 border-b border-white/10 last:border-b-0 transition-colors",
              isActive && "bg-white/5"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.flag}</span>
              <div>
                <span className="font-medium text-white">{item.name[language]}</span>
                <span className="text-sm text-white/60 ml-2">({item.symbol})</span>
              </div>
            </div>
            {isActive && <div className="w-2 h-2 rounded-full bg-amber-400" />}
          </button>
        );
      })}
    </div>
  );
}
