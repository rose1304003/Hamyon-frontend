import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram, useDashboard } from '@/hooks';
import Dashboard from '@/components/Dashboard';
import GoalsList from '@/components/GoalsList';
import TransactionsList from '@/components/TransactionsList';
import AddTransaction from '@/components/AddTransaction';
import { Home, Target, List, Plus } from 'lucide-react';

type Tab = 'home' | 'goals' | 'transactions';

function App() {
  const { user } = useTelegram();
  const { data, loading, error, refresh } = useDashboard();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  useEffect(() => {
    // Apply Telegram theme colors
    const root = document.documentElement;
    if (window.Telegram?.WebApp?.themeParams) {
      const params = window.Telegram.WebApp.themeParams;
      if (params.secondary_bg_color) {
        root.style.setProperty('--bg-secondary', params.secondary_bg_color);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-xl font-semibold mb-2">Hamyon</h1>
          <p className="text-white/60 text-sm">Please open this app from Telegram</p>
        </div>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="text-4xl mb-4">😔</div>
          <h2 className="text-lg font-medium mb-2">Something went wrong</h2>
          <p className="text-white/60 text-sm mb-4">{error}</p>
          <button 
            onClick={refresh}
            className="px-6 py-2 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home' as Tab, icon: Home, label: 'Home' },
    { id: 'goals' as Tab, icon: Target, label: 'Goals' },
    { id: 'transactions' as Tab, icon: List, label: 'History' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white pb-24">
      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Dashboard data={data!} onRefresh={refresh} />
          </motion.div>
        )}
        
        {activeTab === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <GoalsList />
          </motion.div>
        )}
        
        {activeTab === 'transactions' && (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TransactionsList />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {showAddTransaction && (
          <AddTransaction 
            onClose={() => setShowAddTransaction(false)} 
            onSuccess={() => {
              setShowAddTransaction(false);
              refresh();
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setShowAddTransaction(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center z-40"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/10 px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-colors ${
                  isActive ? 'text-amber-400' : 'text-white/60'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-400"
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
