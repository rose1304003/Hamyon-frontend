import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, PiggyBank, X, Check } from 'lucide-react';
import { useSavingsGoals, useTelegram } from '@/hooks';
import type { SavingsGoal } from '@/types';

const GOAL_EMOJIS = ['🎯', '🏠', '🚗', '✈️', '💻', '📱', '💍', '🎓', '💪', '🎮', '🎸', '📷', '👶', '🏖️', '💰'];

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString()} so'm`;
}

export default function GoalsList() {
  const { goals, loading, createGoal, updateGoal, contributeToGoal, deleteGoal } = useSavingsGoals();
  const { hapticFeedback } = useTelegram();
  
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [contributingGoal, setContributingGoal] = useState<SavingsGoal | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [contributionAmount, setContributionAmount] = useState('');

  const handleCreateGoal = async () => {
    if (!name || !amount) return;
    
    hapticFeedback('medium');
    await createGoal({
      name,
      target_amount: parseFloat(amount),
      emoji,
    });
    
    setShowNewGoal(false);
    setName('');
    setAmount('');
    setEmoji('🎯');
  };

  const handleUpdateGoal = async () => {
    if (!editingGoal || !name) return;
    
    hapticFeedback('medium');
    await updateGoal(editingGoal.id, {
      name,
      target_amount: amount ? parseFloat(amount) : undefined,
      emoji,
    });
    
    setEditingGoal(null);
    setName('');
    setAmount('');
    setEmoji('🎯');
  };

  const handleContribute = async () => {
    if (!contributingGoal || !contributionAmount) return;
    
    hapticFeedback('heavy');
    await contributeToGoal(contributingGoal.id, parseFloat(contributionAmount));
    
    setContributingGoal(null);
    setContributionAmount('');
  };

  const handleDeleteGoal = async (goal: SavingsGoal) => {
    hapticFeedback('heavy');
    if (confirm(`Delete "${goal.name}"?`)) {
      await deleteGoal(goal.id);
    }
  };

  const openEditModal = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    setName(goal.name);
    setAmount(goal.target_amount.toString());
    setEmoji(goal.emoji);
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Savings Goals</h1>
          <p className="text-white/60 text-sm">Track your financial dreams</p>
        </div>
        <motion.button
          onClick={() => setShowNewGoal(true)}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <PiggyBank className="w-10 h-10 text-white/40" />
          </div>
          <h3 className="text-lg font-medium mb-2">No savings goals yet</h3>
          <p className="text-white/50 text-sm mb-6">Start by creating your first goal</p>
          <motion.button
            onClick={() => setShowNewGoal(true)}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full font-medium"
          >
            Create Goal
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-2xl p-5 border ${
                  goal.is_completed 
                    ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30' 
                    : 'bg-white/10 border-white/10'
                }`}
              >
                {goal.is_completed && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 rounded-full text-xs font-medium">
                    ✓ Completed
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-3xl shrink-0">
                    {goal.emoji}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1">{goal.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-white/60 text-sm">
                        {formatCurrency(goal.current_amount)}
                      </span>
                      <span className="text-white/40">/</span>
                      <span className="text-white/80 text-sm font-medium">
                        {formatCurrency(goal.target_amount)}
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, progress)}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          goal.is_completed 
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-400' 
                            : 'bg-gradient-to-r from-amber-400 to-orange-500'
                        }`}
                      />
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {!goal.is_completed && (
                        <motion.button
                          onClick={() => setContributingGoal(goal)}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-sm font-medium"
                        >
                          Add Money
                        </motion.button>
                      )}
                      <motion.button
                        onClick={() => openEditModal(goal)}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteGoal(goal)}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* New Goal Modal */}
      <AnimatePresence>
        {showNewGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setShowNewGoal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-gradient-to-br from-emerald-900 to-teal-900 rounded-t-3xl p-6 pb-10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">New Savings Goal</h2>
                <button onClick={() => setShowNewGoal(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Goal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., New Car"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Target Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Choose Emoji</label>
                  <div className="flex flex-wrap gap-2">
                    {GOAL_EMOJIS.map((e) => (
                      <motion.button
                        key={e}
                        onClick={() => setEmoji(e)}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                          emoji === e ? 'bg-amber-400/30 ring-2 ring-amber-400' : 'bg-white/10'
                        }`}
                      >
                        {e}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  onClick={handleCreateGoal}
                  disabled={!name || !amount}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  Create Goal
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Goal Modal */}
      <AnimatePresence>
        {editingGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setEditingGoal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-gradient-to-br from-emerald-900 to-teal-900 rounded-t-3xl p-6 pb-10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Edit Goal</h2>
                <button onClick={() => setEditingGoal(null)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Goal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., New Car"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Target Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Choose Emoji</label>
                  <div className="flex flex-wrap gap-2">
                    {GOAL_EMOJIS.map((e) => (
                      <motion.button
                        key={e}
                        onClick={() => setEmoji(e)}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                          emoji === e ? 'bg-amber-400/30 ring-2 ring-amber-400' : 'bg-white/10'
                        }`}
                      >
                        {e}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  onClick={handleUpdateGoal}
                  disabled={!name}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contribute Modal */}
      <AnimatePresence>
        {contributingGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setContributingGoal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-gradient-to-br from-emerald-900 to-teal-900 rounded-t-3xl p-6 pb-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Add to {contributingGoal.name}</h2>
                  <p className="text-white/60 text-sm">
                    {formatCurrency(contributingGoal.target_amount - contributingGoal.current_amount)} remaining
                  </p>
                </div>
                <button onClick={() => setContributingGoal(null)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Amount</label>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 text-2xl text-center"
                    autoFocus
                  />
                </div>
                
                {/* Quick amounts */}
                <div className="flex gap-2">
                  {[10000, 50000, 100000, 500000].map((quickAmount) => (
                    <motion.button
                      key={quickAmount}
                      onClick={() => setContributionAmount(quickAmount.toString())}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 bg-white/10 rounded-lg text-sm"
                    >
                      +{(quickAmount / 1000)}k
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  onClick={handleContribute}
                  disabled={!contributionAmount}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  Add Money
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
