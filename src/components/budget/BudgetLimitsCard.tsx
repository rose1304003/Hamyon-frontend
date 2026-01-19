import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, AlertTriangle, Trash2, Edit2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { 
  getBudgetLimits, 
  saveBudgetLimit, 
  deleteBudgetLimit, 
  getBudgetAlerts,
  BudgetLimit,
  BudgetAlert 
} from "@/lib/budgetLimits";
import { getSpendingByCategory } from "@/lib/storage";
import { Progress } from "@/components/ui/progress";

const CATEGORIES = [
  { id: "food", icon: "🍔", color: "bg-orange-500" },
  { id: "transport", icon: "🚌", color: "bg-blue-500" },
  { id: "entertainment", icon: "🎮", color: "bg-purple-500" },
  { id: "shopping", icon: "🛒", color: "bg-pink-500" },
  { id: "education", icon: "📚", color: "bg-green-500" },
  { id: "health", icon: "💊", color: "bg-red-500" },
  { id: "utilities", icon: "💡", color: "bg-yellow-500" },
  { id: "other", icon: "📦", color: "bg-gray-500" },
];

export function BudgetLimitsCard() {
  const { t } = useLanguage();
  const [limits, setLimits] = useState<BudgetLimit[]>([]);
  const [alerts, setAlerts] = useState<BudgetAlert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLimit, setEditingLimit] = useState<BudgetLimit | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedLimits = getBudgetLimits();
    const spending = getSpendingByCategory();
    const budgetAlerts = getBudgetAlerts(storedLimits, spending);
    setLimits(storedLimits);
    setAlerts(budgetAlerts);
  };

  const handleSave = () => {
    if (!selectedCategory || !limitAmount) return;

    const newLimit: BudgetLimit = {
      id: editingLimit?.id || `limit_${Date.now()}`,
      category: selectedCategory,
      limit: parseFloat(limitAmount),
      period,
      createdAt: editingLimit?.createdAt || Date.now(),
    };

    saveBudgetLimit(newLimit);
    loadData();
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteBudgetLimit(id);
    loadData();
  };

  const handleEdit = (limit: BudgetLimit) => {
    setEditingLimit(limit);
    setSelectedCategory(limit.category);
    setLimitAmount(limit.limit.toString());
    setPeriod(limit.period);
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingLimit(null);
    setSelectedCategory("");
    setLimitAmount("");
    setPeriod("monthly");
  };

  const getAlertForCategory = (category: string) => {
    return alerts.find(a => a.category === category);
  };

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[7];
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-400" />
            {t("budget.limits")}
          </h3>
          <p className="text-sm text-white/60">{t("budget.limitsDescription")}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 rounded-xl text-sm font-medium active:scale-95 transition-transform"
        >
          <Plus className="h-4 w-4" />
          {t("budget.addLimit")}
        </button>
      </div>

      {/* Limits List */}
      {limits.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-white/40" />
          </div>
          <p className="text-white/60 mb-4">{t("budget.noLimits")}</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-amber-400 font-medium"
          >
            {t("budget.createFirst")}
          </button>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden divide-y divide-white/10">
          {limits.map((limit) => {
            const alert = getAlertForCategory(limit.category);
            const category = getCategoryInfo(limit.category);
            
            return (
              <div key={limit.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <p className="font-medium text-white capitalize">
                        {t(`categories.${limit.category}`)}
                      </p>
                      <p className="text-xs text-white/60">
                        {limit.period === "monthly" ? t("budget.monthly") : t("budget.weekly")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {alert?.status === "exceeded" && (
                      <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
                    )}
                    {alert?.status === "warning" && (
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    )}
                    <button
                      onClick={() => handleEdit(limit)}
                      className="p-2 text-white/40 hover:text-white rounded-lg"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(limit.id)}
                      className="p-2 text-white/40 hover:text-red-400 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <Progress 
                    value={alert?.percentage || 0} 
                    className={cn(
                      "h-2 bg-white/10",
                      alert?.status === "exceeded" && "[&>div]:bg-red-400",
                      alert?.status === "warning" && "[&>div]:bg-amber-400",
                      alert?.status === "safe" && "[&>div]:bg-emerald-400"
                    )}
                  />
                  <div className="flex justify-between text-sm">
                    <span className={cn(
                      "font-medium",
                      alert?.status === "exceeded" && "text-red-400",
                      alert?.status === "warning" && "text-amber-400",
                      alert?.status === "safe" && "text-emerald-400"
                    )}>
                      {formatAmount(alert?.spent || 0)} {t("common.sum")}
                    </span>
                    <span className="text-white/60">
                      / {formatAmount(limit.limit)} {t("common.sum")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && resetForm()}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="w-full max-w-md glass rounded-t-3xl sm:rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {editingLimit ? t("budget.editLimit") : t("budget.addLimit")}
                </h2>
                <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-full">
                  <X className="h-5 w-5 text-white/60" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">
                    {t("budget.selectCategory")}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "flex flex-col items-center gap-1 p-3 rounded-xl transition-all",
                          selectedCategory === cat.id
                            ? "bg-amber-400/20 ring-2 ring-amber-400"
                            : "bg-white/10 hover:bg-white/20"
                        )}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs text-white/60 capitalize">
                          {t(`categories.${cat.id}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Limit Amount */}
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">
                    {t("budget.limitAmount")}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={limitAmount}
                      onChange={(e) => setLimitAmount(e.target.value)}
                      placeholder="500000"
                      className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 text-sm">
                      {t("common.sum")}
                    </span>
                  </div>
                </div>

                {/* Period Selection */}
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">
                    {t("budget.period")}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPeriod("monthly")}
                      className={cn(
                        "flex-1 py-3 rounded-xl font-medium transition-all",
                        period === "monthly"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900"
                          : "bg-white/10 text-white/60"
                      )}
                    >
                      {t("budget.monthly")}
                    </button>
                    <button
                      onClick={() => setPeriod("weekly")}
                      className={cn(
                        "flex-1 py-3 rounded-xl font-medium transition-all",
                        period === "weekly"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900"
                          : "bg-white/10 text-white/60"
                      )}
                    >
                      {t("budget.weekly")}
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={!selectedCategory || !limitAmount}
                  className={cn(
                    "w-full py-4 rounded-xl font-semibold transition-all",
                    selectedCategory && limitAmount
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 active:scale-98"
                      : "bg-white/10 text-white/40"
                  )}
                >
                  {editingLimit ? t("common.save") : t("budget.addLimit")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
