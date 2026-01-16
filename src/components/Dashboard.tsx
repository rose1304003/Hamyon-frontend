import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, Wallet } from 'lucide-react';
import type { DashboardData } from '@/types';

interface DashboardProps {
  data: DashboardData;
  onRefresh: () => void;
}

function formatCurrency(amount: number, currency: string = 'UZS'): string {
  if (currency === 'UZS') {
    return `${amount.toLocaleString()} so'm`;
  } else if (currency === 'USD') {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else if (currency === 'RUB') {
    return `${amount.toLocaleString()} ₽`;
  }
  return `${amount.toLocaleString()} ${currency}`;
}

export default function Dashboard({ data, onRefresh }: DashboardProps) {
  const currency = data.user.currency || 'UZS';
  const progress = data.monthly_summary.income > 0 
    ? Math.min(100, (data.monthly_summary.savings / data.monthly_summary.income) * 100)
    : 0;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm">Welcome back</p>
          <h1 className="text-2xl font-bold">{data.user.first_name || 'User'} 👋</h1>
        </div>
        <motion.button
          onClick={onRefresh}
          whileTap={{ scale: 0.9, rotate: 180 }}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl p-6 border border-white/10"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-white/60" />
            <span className="text-white/60 text-sm">Total Balance</span>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            {formatCurrency(data.balance.balance, currency)}
          </h2>
          
          <div className="flex gap-4">
            <div className="flex-1 bg-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-white/60 text-xs">Income</span>
              </div>
              <p className="text-lg font-semibold text-emerald-400">
                +{formatCurrency(data.monthly_summary.income, currency)}
              </p>
            </div>
            
            <div className="flex-1 bg-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                </div>
                <span className="text-white/60 text-xs">Expenses</span>
              </div>
              <p className="text-lg font-semibold text-rose-400">
                -{formatCurrency(data.monthly_summary.expense, currency)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white/10 backdrop-blur-xl p-4 border border-white/10"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/80 font-medium">Monthly Savings Rate</span>
          <span className="text-amber-400 font-bold">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Active Goals Preview */}
      {data.savings_goals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3">Active Goals</h3>
          <div className="space-y-3">
            {data.savings_goals.slice(0, 3).map((goal, index) => {
              const goalProgress = (goal.current_amount / goal.target_amount) * 100;
              
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 border border-white/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                    {goal.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{goal.name}</h4>
                      <span className="text-white/60 text-sm">{goalProgress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, goalProgress)}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/50 mt-1">
                      {formatCurrency(goal.current_amount, currency)} / {formatCurrency(goal.target_amount, currency)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {data.recent_transactions.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              <p>No transactions yet</p>
              <p className="text-sm mt-1">Tap + to add your first one</p>
            </div>
          ) : (
            data.recent_transactions.slice(0, 5).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex items-center gap-3 bg-white/5 rounded-xl p-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                  {transaction.category_emoji || (transaction.type === 'income' ? '💰' : '💸')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {transaction.description || transaction.category_name || (transaction.type === 'income' ? 'Income' : 'Expense')}
                  </p>
                  <p className="text-xs text-white/50">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`font-semibold ${transaction.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
