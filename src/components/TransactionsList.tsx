import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions, useTelegram } from '@/hooks';

type FilterType = 'all' | 'income' | 'expense';

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString()} so'm`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
}

export default function TransactionsList() {
  const { transactions, loading, deleteTransaction } = useTransactions();
  const { hapticFeedback } = useTelegram();
  const [filter, setFilter] = useState<FilterType>('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  const handleDelete = async (id: number) => {
    hapticFeedback('heavy');
    setDeletingId(id);
    
    setTimeout(async () => {
      await deleteTransaction(id);
      setDeletingId(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-white/10 rounded-xl">
          {[
            { id: 'all' as FilterType, label: 'All' },
            { id: 'income' as FilterType, label: 'Income', icon: TrendingUp },
            { id: 'expense' as FilterType, label: 'Expense', icon: TrendingDown },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                filter === tab.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/60'
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <Filter className="w-10 h-10 text-white/40" />
          </div>
          <h3 className="text-lg font-medium mb-2">No transactions</h3>
          <p className="text-white/50 text-sm">
            {filter !== 'all' 
              ? `No ${filter} transactions found`
              : 'Start tracking your money by adding transactions'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
            <div key={date}>
              <h3 className="text-sm text-white/50 font-medium mb-3 sticky top-0 bg-emerald-900/80 backdrop-blur-sm py-2 -mx-4 px-4">
                {formatDate(date)}
              </h3>
              
              <div className="space-y-2">
                <AnimatePresence>
                  {dayTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: deletingId === transaction.id ? 0 : 1, 
                        x: deletingId === transaction.id ? -100 : 0,
                        height: deletingId === transaction.id ? 0 : 'auto'
                      }}
                      exit={{ opacity: 0, x: -100, height: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-3 bg-white/5 rounded-xl p-4 group"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        transaction.type === 'income' 
                          ? 'bg-emerald-500/20' 
                          : 'bg-rose-500/20'
                      }`}>
                        {transaction.category_emoji || (transaction.type === 'income' ? '💰' : '💸')}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {transaction.description || transaction.category_name || 
                            (transaction.type === 'income' ? 'Income' : 'Expense')}
                        </p>
                        <p className="text-xs text-white/50">
                          {transaction.category_name || transaction.type}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                      </div>
                      
                      <motion.button
                        onClick={() => handleDelete(transaction.id)}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-lg bg-rose-500/0 hover:bg-rose-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-rose-400" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Footer */}
      {filteredTransactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Total {filter !== 'all' ? filter : 'transactions'}:</span>
            <span className="font-medium">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </span>
          </div>
          {filter === 'all' && (
            <div className="flex justify-between text-sm mt-2">
              <span className="text-white/60">Net:</span>
              <span className={`font-medium ${
                filteredTransactions.reduce((sum, t) => 
                  sum + (t.type === 'income' ? t.amount : -t.amount), 0) >= 0
                    ? 'text-emerald-400'
                    : 'text-rose-400'
              }`}>
                {formatCurrency(
                  filteredTransactions.reduce((sum, t) => 
                    sum + (t.type === 'income' ? t.amount : -t.amount), 0)
                )}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
