import { Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getSavingsGoals, getMonthlyTotals } from "@/lib/storage";
import { useMemo } from "react";

export function SavingsProgress() {
  const { t } = useLanguage();

  const { totalSaved, totalTarget, savingsRate, goalsCount, completedGoals } = useMemo(() => {
    const goals = getSavingsGoals();
    const { income, expenses } = getMonthlyTotals();
    
    const totalSaved = goals.reduce((sum, g) => sum + g.current, 0);
    const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
    const completedGoals = goals.filter(g => g.current >= g.target).length;
    
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

    return {
      totalSaved,
      totalTarget,
      savingsRate: Math.max(0, savingsRate),
      goalsCount: goals.length,
      completedGoals,
    };
  }, []);

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
    return amount.toString();
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-4">{t("analytics.savingsOverview")}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Total Saved */}
        <div className="bg-emerald-400/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-white/60">{t("analytics.totalSaved")}</span>
          </div>
          <p className="text-lg font-bold text-emerald-400">{formatAmount(totalSaved)}</p>
          {totalTarget > 0 && (
            <p className="text-xs text-white/60 mt-1">
              / {formatAmount(totalTarget)} {t("analytics.target")}
            </p>
          )}
        </div>

        {/* Savings Rate */}
        <div className="bg-amber-400/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-amber-400" />
            <span className="text-xs text-white/60">{t("analytics.savingsRate")}</span>
          </div>
          <p className="text-lg font-bold text-amber-400">{savingsRate.toFixed(0)}%</p>
          <p className="text-xs text-white/60 mt-1">{t("analytics.ofIncome")}</p>
        </div>
      </div>

      {/* Goals Progress */}
      {goalsCount > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">{t("analytics.goalsCompleted")}</span>
            <span className="font-semibold text-white">{completedGoals} / {goalsCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
