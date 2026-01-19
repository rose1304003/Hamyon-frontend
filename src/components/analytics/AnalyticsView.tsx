import { motion } from "framer-motion";
import { SpendingAnalytics, WeeklyChart, MonthlyTrend, SavingsProgress } from "@/components/analytics";
import { BudgetLimitsCard } from "@/components/budget";
import { useLanguage } from "@/lib/i18n";

export function AnalyticsView() {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="space-y-6 p-4 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-white">{t("analytics.title")}</h1>
        <p className="text-sm text-white/60">{t("analytics.thisMonth")}</p>
      </header>

      {/* Budget Limits Section */}
      <BudgetLimitsCard />
      
      {/* Weekly Overview Chart */}
      <WeeklyChart />
      
      {/* Monthly Trend Chart */}
      <MonthlyTrend />
      
      {/* Savings Progress */}
      <SavingsProgress />
      
      {/* Spending Analytics (Pie Chart) */}
      <SpendingAnalytics />
    </motion.div>
  );
}
