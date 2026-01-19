import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/lib/i18n";
import { getTransactions } from "@/lib/storage";
import { useMemo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function MonthlyTrend() {
  const { t, language } = useLanguage();

  const { monthData, trend, percentChange } = useMemo(() => {
    const transactions = getTransactions();
    const now = new Date();
    const months: { name: string; total: number }[] = [];

    const monthNames = {
      en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      uz: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"],
    };

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const startOfMonth = date.getTime();
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

      const monthTotal = transactions
        .filter(t => t.createdAt >= startOfMonth && t.createdAt <= endOfMonth && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        name: monthNames[language][date.getMonth()],
        total: monthTotal,
      });
    }

    const lastMonth = months[months.length - 1]?.total || 0;
    const prevMonth = months[months.length - 2]?.total || 0;
    
    let trend: "up" | "down" | "neutral" = "neutral";
    let percentChange = 0;
    
    if (prevMonth > 0) {
      percentChange = ((lastMonth - prevMonth) / prevMonth) * 100;
      trend = percentChange > 5 ? "up" : percentChange < -5 ? "down" : "neutral";
    }

    return { monthData: months, trend, percentChange: Math.abs(percentChange) };
  }, [language]);

  const hasData = monthData.some(d => d.total > 0);

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-red-400" : trend === "down" ? "text-emerald-400" : "text-white/60";

  if (!hasData) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">{t("analytics.monthlyTrend")}</h3>
        <div className="h-32 flex items-center justify-center text-white/60 text-sm">
          {t("analytics.noMonthlyData")}
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">{t("analytics.monthlyTrend")}</h3>
        <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          <span>{percentChange.toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#fbbf24" 
              strokeWidth={2}
              dot={{ fill: "#fbbf24", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
      trend = percentChange > 5 ? "up" : percentChange < -5 ? "down" : "neutral";
    }

    return { monthData: months, trend, percentChange: Math.abs(percentChange) };
  }, [language]);

  const hasData = monthData.some(d => d.total > 0);

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-red-400" : trend === "down" ? "text-emerald-400" : "text-white/60";

  if (!hasData) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">{t("analytics.monthlyTrend")}</h3>
        <div className="h-32 flex items-center justify-center text-white/60 text-sm">
          {t("analytics.noMonthlyData")}
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">{t("analytics.monthlyTrend")}</h3>
        <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          <span>{percentChange.toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#fbbf24" 
              strokeWidth={2}
              dot={{ fill: "#fbbf24", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
