import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram, useDashboard } from '@/hooks';
import Dashboard from '@/components/Dashboard';
import GoalsList from '@/components/GoalsList';
import TransactionsList from '@/components/TransactionsList';
import AddTransaction from '@/components/AddTransaction';
import { LearnView } from '@/components/learn';
import { Home, Target, List, Plus, GraduationCap, Sparkles } from 'lucide-react';

type Tab = 'home' | 'goals' | 'transactions' | 'learn';

function App() {
  const { user } = useTelegram();
  const { data, loading, error, refresh } = useDashboard();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (window.Telegram?.WebApp?.themeParams) {
      const params = window.Telegram.WebApp.themeParams;
      if (params.secondary_bg_color) {
        root.style.setProperty('--bg-secondary', params.secondary_bg_color);
      }
    }
  }, []);

  const isDevelopment = !window.Telegram?.WebApp?.initDataUnsafe?.user;
  
  if (!user && !isDevelopment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <motion.div 
            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-4xl">💰</span>
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hamyon
          </motion.h1>
          <motion.p 
            className="text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Telegram orqali oching
          </motion.p>
        </div>
      </div>
    );
  }

  if (loading && !data && activeTab !== 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center">
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-16 h-16 border-4 border-white/10 border-t-amber-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-6 h-6 text-amber-400" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error && activeTab !== 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
        <motion.div 
          className="text-center text-white glass rounded-2xl p-8 max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-lg font-semibold mb-2">Xatolik yuz berdi</h2>
          <p className="text-white/60 text-sm mb-6">{error}</p>
          <motion.button 
            onClick={refresh}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl text-amber-900 font-semibold shadow-lg shadow-amber-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Qayta urinish
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'home' as Tab, icon: Home, label: 'Asosiy' },
    { id: 'goals' as Tab, icon: Target, label: 'Maqsadlar' },
    { id: 'learn' as Tab, icon: GraduationCap, label: "O'rganish" },
    { id: 'transactions' as Tab, icon: List, label: 'Tarix' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white pb-24">
      <AnimatePresence mode="wait">
        {activeTab === 'home' && data && (
          <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <Dashboard data={data} onRefresh={refresh} />
          </motion.div>
        )}
        {activeTab === 'goals' && (
          <motion.div key="goals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <GoalsList />
          </motion.div>
        )}
        {activeTab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <LearnView />
          </motion.div>
        )}
        {activeTab === 'transactions' && (
          <motion.div key="transactions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            <TransactionsList />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddTransaction && (
          <AddTransaction onClose={() => setShowAddTransaction(false)} onSuccess={() => { setShowAddTransaction(false); refresh(); }} />
        )}
      </AnimatePresence>

      {activeTab !== 'learn' && (
        <motion.button
          onClick={() => setShowAddTransaction(true)}
          className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center z-40"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <Plus className="w-6 h-6 text-amber-900" />
        </motion.button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10 px-2 py-2 z-50 safe-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors relative ${isActive ? 'text-amber-400' : 'text-white/50'}`}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                  {isActive && (
                    <motion.div
                      className="absolute -inset-2 bg-amber-400/20 rounded-xl -z-10"
                      layoutId="activeTabBg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;
