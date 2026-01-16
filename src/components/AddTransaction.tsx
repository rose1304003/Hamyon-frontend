import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Check } from 'lucide-react';
import { useCategories, useTelegram } from '@/hooks';
import api from '@/services/api';
import type { Category } from '@/types';

interface AddTransactionProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTransaction({ onClose, onSuccess }: AddTransactionProps) {
  const { hapticFeedback } = useTelegram();
  const { categories } = useCategories();
  
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCategories = categories.filter(c => c.type === type);

  useEffect(() => {
    setSelectedCategory(null);
  }, [type]);

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    hapticFeedback('medium');

    try {
      await api.createTransaction({
        amount: parseFloat(amount),
        type,
        category_id: selectedCategory?.id,
        description: description || undefined,
      });
      
      hapticFeedback('heavy');
      onSuccess();
    } catch (error) {
      console.error('Failed to create transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAmount = (value: number) => {
    hapticFeedback('light');
    setAmount((prev) => {
      const current = parseFloat(prev) || 0;
      return (current + value).toString();
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Add Transaction</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Type Toggle */}
        <div className="p-4">
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
            <motion.button
              onClick={() => setType('expense')}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                type === 'expense'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'text-white/60'
              }`}
            >
              <TrendingDown className="w-5 h-5" />
              Expense
            </motion.button>
            <motion.button
              onClick={() => setType('income')}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                type === 'income'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-white/60'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Income
            </motion.button>
          </div>
        </div>

        {/* Amount Input */}
        <div className="px-4 pb-4">
          <label className="text-sm text-white/50 mb-2 block">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-3xl font-bold text-white text-center placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors"
              autoFocus
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 text-lg">
              so'm
            </span>
          </div>
          
          {/* Quick Amount Buttons */}
          <div className="flex gap-2 mt-3">
            {[10000, 50000, 100000, 500000].map((quickAmount) => (
              <motion.button
                key={quickAmount}
                onClick={() => handleQuickAmount(quickAmount)}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/70 font-medium transition-colors"
              >
                +{quickAmount >= 1000 ? `${quickAmount / 1000}k` : quickAmount}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div className="px-4 pb-4">
          <label className="text-sm text-white/50 mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {filteredCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  hapticFeedback('light');
                  setSelectedCategory(category.id === selectedCategory?.id ? null : category);
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                  selectedCategory?.id === category.id
                    ? type === 'expense'
                      ? 'bg-rose-500/30 ring-2 ring-rose-400'
                      : 'bg-emerald-500/30 ring-2 ring-emerald-400'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <span>{category.emoji}</span>
                <span className="text-sm text-white">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="px-4 pb-4">
          <label className="text-sm text-white/50 mb-2 block">Note (optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Submit Button */}
        <div className="p-4 pb-8">
          <motion.button
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0 || isSubmitting}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              type === 'expense'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30'
            }`}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Check className="w-5 h-5" />
                Add {type === 'expense' ? 'Expense' : 'Income'}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
