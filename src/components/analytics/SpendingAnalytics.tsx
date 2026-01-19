import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useLanguage } from "@/lib/i18n";
import { getSpendingByCategory, getMonthlyTotals } from "@/lib/storage";
import { TrendingDown, TrendingUp, PieChart as PieIcon } from "lucide-react";

const COLORS = [
  "#FF6B6B", // shopping - pink/red
  "#FF9F43", // food - orange
  "#54A0FF", // transport - blue
  "#A55EEA", // phone - purple
  "#FF6B6B", // restaurant - red
  "#00D2D3", // entertainment - teal
  "#10AC84", // education - green
  "#EE5A6F", // health - rose
  "#2ECC71", // gift - green
  "#95A5A6", // other - gray
];

const categoryOrder = [
  "shopping",
  "food",
  "transport",
  "phone",
  "restaurant",
  "entertainment",
  "education",
  "health",
  "gift",
  "other",
];

export function SpendingAnalytics() {
  const { t } = useLanguage();
  const spendingByCategory = getSpendingByCategory();
  const { income, expenses } = getMonthlyTotals();

  const chartData = categoryOrder
    .filter((cat) => spendingByCategory[cat])
    .map((cat, index) => ({
      name: t(`categories.${cat}`),
      value: spendingByCategory[cat],
      color: COLORS[index % COLORS.length],
    }));

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + "M";
    }
    if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + "K";
    }
    return amount.toString();
  };

  const hasData = chartData.length > 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/20 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-sm text-white/60">{t("analytics.totalIncome")}</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">
            +{formatAmount(income)} <span className="text-sm font-normal">{t("common.sum")}</span>
          </p>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-red-400/20 flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-red-400" />
            </div>
            <span className="text-sm text-white/60">{t("analytics.totalSpent")}</span>
          </div>
          <p className="text-xl font-bold text-white">
            -{formatAmount(expenses)} <span className="text-sm font-normal">{t("common.sum")}</span>
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">{t("analytics.byCategory")}</h3>
        
        {hasData ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value, entry: any) => (
                    <span className="text-sm text-white">
                      {value}: {formatAmount(entry.payload.value)}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <PieIcon className="h-8 w-8 text-white/40" />
            </div>
            <p className="text-white/60 font-medium">{t("analytics.noData")}</p>
            <p className="text-sm text-white/40">{t("analytics.startTracking")}</p>
          </div>
        )}
      </div>

      {/* Category breakdown list */}
      {hasData && (
        <div>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">{t("analytics.byCategory")}</h3>
          <div className="glass rounded-2xl overflow-hidden">
            {chartData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-4 border-b border-white/10 last:border-b-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-white">{item.name}</span>
                </div>
                <span className="font-semibold text-white tabular-nums">
                  {new Intl.NumberFormat("uz-UZ").format(item.value)} {t("common.sum")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
