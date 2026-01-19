import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/lib/i18n";
import { getTransactions } from "@/lib/storage";
import { useMemo } from "react";

export function WeeklyChart() {
  const { t, language } = useLanguage();

  const weekData = useMemo(() => {
    const transactions = getTransactions();
    const now = new Date();
    const weekDays: { name: string; income: number; expense: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      const dayNames = {
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        uz: ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"],
      };

      const dayTotals = transactions
        .filter(t => new Date(t.createdAt).toDateString() === dateStr)
        .reduce(
          (acc, t) => {
            if (t.type === "income") acc.income += t.amount;
            else acc.expense += t.amount;
            return acc;
          },
          { income: 0, expense: 0 }
        );

      weekDays.push({
        name: dayNames[language][date.getDay()],
        ...dayTotals,
      });
    }

    return weekDays;
  }, [language]);

  const hasData = weekData.some(d => d.income > 0 || d.expense > 0);

  if (!hasData) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">{t("analytics.weeklyOverview")}</h3>
        <div className="h-40 flex items-center justify-center text-white/60 text-sm">
          {t("analytics.noWeeklyData")}
        </div>
      </div>
    );
  }

  const formatAmount = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-4">{t("analytics.weeklyOverview")}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.6)" }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "rgba(255,255,255,0.6)" }}
              tickFormatter={formatAmount}
              width={40}
            />
            <Bar dataKey="income" radius={[4, 4, 0, 0]} fill="#34d399" />
            <Bar dataKey="expense" radius={[4, 4, 0, 0]} fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-xs text-white/60">{t("analytics.income")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span className="text-xs text-white/60">{t("analytics.expenses")}</span>
        </div>
      </div>
    </div>
  );
}
