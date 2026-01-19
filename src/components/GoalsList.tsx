import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, PiggyBank, X, Check } from 'lucide-react';
import { useSavingsGoals, useTelegram } from '@/hooks';
import { useLanguage } from '@/lib/i18n';
import type { SavingsGoal } from '@/types';

const GOAL_EMOJIS = ['🎯', '🏠', '🚗', '✈️', '💻', '📱', '💍', '🎓', '💪', '🎮', '🎸', '📷', '👶', '🏖️', '💰'];

export default function GoalsList() {
  const { t, language } = useLanguage();
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

  const texts = {
    savingsGoals: { en: "Savings Goals", ru: "Цели сбережений", uz: "Tejash maqsadlari" },
    trackDreams: { en: "Track your financial dreams", ru: "Следите за финансовыми целями", uz: "Moliyaviy orzularingizni kuzating" },
    noGoalsYet: { en: "No savings goals yet", ru: "Пока нет целей", uz: "Hali maqsadlar yo'q" },
    startCreating: { en: "Start by creating your first goal", ru: "Начните с создания первой цели", uz: "Birinchi maqsadni yaratishdan boshlang" },
    createGoal: { en: "Create Goal", ru: "Создать цель", uz: "Maqsad yaratish" },
    completed: { en: "Completed", ru: "Завершено", uz: "Bajarildi" },
    addMoney: { en: "Add Money", ru: "Добавить", uz: "Pul qo'shish" },
    newGoal: { en: "New Goal", ru: "Новая цель", uz: "Yangi maqsad" },
    editGoal: { en: "Edit Goal", ru: "Редактировать", uz: "Tahrirlash" },
    goalName: { en: "Goal Name", ru: "Название цели", uz: "Maqsad nomi" },
    enterGoalName: { en: "e.g., New iPhone", ru: "напр., Новый iPhone", uz: "masalan, Yangi iPhone" },
    targetAmount: { en: "Target Amount", ru: "Целевая сумма", uz: "Maqsad summasi" },
    selectEmoji: { en: "Select Emoji", ru: "Выберите эмодзи", uz: "Emoji tanlang" },
    cancel: { en: "Cancel", ru: "Отмена", uz: "Bekor qilish" },
    create: { en: "Create", ru: "Создать", uz: "Yaratish" },
    save: { en: "Save", ru: "Сохранить", uz: "Saqlash" },
    addToGoal: { en: "Add to Goal", ru: "Добавить к цели", uz: "Maqsadga qo'shish" },
    howMuch: { en: "How much do you want to add?", ru: "Сколько хотите добавить?", uz: "Qancha qo'shmoqchisiz?" },
    amount: { en: "Amount", ru: "Сумма", uz: "Miqdor" },
    add: { en: "Add", ru: "Добавить", uz: "Qo'shish" },
    deleteConfirm: { en: "Delete", ru: "Удалить", uz: "O'chirish" },
  };

  function formatCurrency(amount: number): string {
    const symbol = language === 'en' ? "sum" : language === 'ru' ? "сум" : "so'm";
    return `${amount.toLocaleString()} ${symbol}`;
  }

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
    const confirmText = language === 'ru' ? `Удалить "${goal.name}"?` : 
                        language === 'uz' ? `"${goal.name}" ni o'chirishni xohlaysizmi?` :
                        `Delete "${goal.name}"?`;
    if (confirm(confirmText)) {
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
          <h1 className="text-2xl font-bold">{texts.savingsGoals[language]}</h1>
          <p className="text-white/60 text-sm">{texts.trackDreams[language]}</p>
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
          <h3 className="text-lg font-medium mb-2">{texts.noGoalsYet[language]}</h3>
          <p className="text-white/50 text-sm mb-6">{texts.startCreating[language]}</p>
          <motion.button
            onClick={() => setShowNewGoal(true)}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full font-medium"
          >
            {texts.createGoal[language]}
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
                    ✓ {texts.completed[language]}
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
                          {texts.addMoney[language]}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
            onClick={() => setShowNewGoal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md bg-gradient-to-br from-emerald-900 to-teal-900 rounded-t-3xl sm:rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{texts.newGoal[language]}</h2>
                <button onClick={() => setShowNewGoal(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">{texts.goalName[language]}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={texts.enterGoalName[language]}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">{texts.targetAmount[language]}</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1,000,000"
                    className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">{texts.selectEmoji[language]}</label>
                  <div className="flex flex-wrap gap-2">
                    {GOAL_EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={`w-10 h-10 rounded-lg text-xl ${
                          emoji === e ? 'bg-amber-400/30 ring-2 ring-amber-400' : 'bg-white/10'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowNewGoal(false)}
                    className="flex-1 py-3 bg-white/10 rounded-xl font-medium"
                  >
                    {texts.cancel[language]}
                  </button>
                  <button
                    onClick={handleCreateGoal}
                    disabled={!name || !amount}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl font-medium disabled:opacity-50"
                  >
                    {texts.create[language]}
                  </button>
                </div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
            onClick={() => setEditingGoal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md bg-gradient-to-br from-emerald-900 to-teal-900 rounded-t-3xl sm:rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{texts.editGoal[language]}</h2>
                <button onClick={() => setEditingGoal(null)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">{texts.goalName[language]}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">{texts.targetAmount[language]}</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">{texts.selectEmoji[language]}</label>
                  <div className="flex flex-wrap gap-2">
                    {GOAL_EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={`w-10 h-10 rounded-lg text-xl ${
                          emoji === e ? 'bg-amber-400/30 ring-2 ring-amber-400' : 'bg-white/10'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setEditingGoal(null)}
                    className="flex-1 py-3 bg-white/10 rounded-xl font-medium"
                  >
                    {texts.cancel[language]}
                  </button>
                  <button
                    onClick={handleUpdateGoal}
                    disabled={!name}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl font-medium disabled:opacity-50"
                  >
                    {texts.save[language]}
                  </button>
                </div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
            onClick={() => setContributingGoal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md bg-gradient-to-br from-emerald-900 to-teal-900 rounded-t-3xl sm:rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{texts.addToGoal[language]}</h2>
                <button onClick={() => setContributingGoal(null)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6 p-4 bg-white/10 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                  {contributingGoal.emoji}
                </div>
                <div>
                  <h3 className="font-semibold">{contributingGoal.name}</h3>
                  <p className="text-sm text-white/60">
                    {formatCurrency(contributingGoal.current_amount)} / {formatCurrency(contributingGoal.target_amount)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">{texts.howMuch[language]}</label>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    placeholder={texts.amount[language]}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xl font-semibold text-center"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setContributingGoal(null)}
                    className="flex-1 py-3 bg-white/10 rounded-xl font-medium"
                  >
                    {texts.cancel[language]}
                  </button>
                  <button
                    onClick={handleContribute}
                    disabled={!contributionAmount}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {texts.add[language]}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
