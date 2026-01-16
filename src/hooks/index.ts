import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';
import type { DashboardData, SavingsGoal, Transaction, Category } from '@/types';

// Hook to get Telegram Web App data
export function useTelegram() {
  const [webApp, setWebApp] = useState<typeof window.Telegram.WebApp | null>(null);
  const [user, setUser] = useState<{
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      setWebApp(tg);
      
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
        api.setAuth(tg.initDataUnsafe.user.id.toString(), tg.initData);
      }
      
      // Expand the app to full height
      tg.expand();
      
      // Set theme
      document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
      document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
    } else {
      // Development mode - use URL param
      const params = new URLSearchParams(window.location.search);
      const telegramId = params.get('telegram_id');
      if (telegramId) {
        api.setAuth(telegramId);
        setUser({
          id: parseInt(telegramId),
          first_name: 'Test User',
        });
      }
    }
  }, []);

  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
    webApp?.HapticFeedback?.impactOccurred(type);
  }, [webApp]);

  const showAlert = useCallback((message: string) => {
    webApp?.showAlert(message);
  }, [webApp]);

  const close = useCallback(() => {
    webApp?.close();
  }, [webApp]);

  return { webApp, user, hapticFeedback, showAlert, close };
}

// Hook for dashboard data
export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getDashboard();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

// Hook for savings goals
export function useSavingsGoals() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getGoals();
      setGoals(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load goals');
    } finally {
      setLoading(false);
    }
  }, []);

  const createGoal = useCallback(async (data: {
    name: string;
    target_amount: number;
    emoji?: string;
    deadline?: string;
  }) => {
    const goal = await api.createGoal(data);
    setGoals(prev => [goal, ...prev]);
    return goal;
  }, []);

  const updateGoal = useCallback(async (id: number, data: {
    name?: string;
    target_amount?: number;
    emoji?: string;
  }) => {
    const updated = await api.updateGoal(id, data);
    setGoals(prev => prev.map(g => g.id === id ? updated : g));
    return updated;
  }, []);

  const contributeToGoal = useCallback(async (id: number, amount: number, note?: string) => {
    const updated = await api.contributeToGoal(id, amount, note);
    setGoals(prev => prev.map(g => g.id === id ? updated : g));
    return updated;
  }, []);

  const deleteGoal = useCallback(async (id: number) => {
    await api.deleteGoal(id);
    setGoals(prev => prev.filter(g => g.id !== id));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { goals, loading, error, refresh, createGoal, updateGoal, contributeToGoal, deleteGoal };
}

// Hook for transactions
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (options?: {
    limit?: number;
    type?: 'income' | 'expense';
  }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getTransactions(options);
      setTransactions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (data: {
    amount: number;
    type: 'income' | 'expense';
    category_id?: number;
    description?: string;
    date?: string;
  }) => {
    const transaction = await api.createTransaction(data);
    setTransactions(prev => [transaction, ...prev]);
    return transaction;
  }, []);

  const deleteTransaction = useCallback(async (id: number) => {
    await api.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { transactions, loading, error, refresh, createTransaction, deleteTransaction };
}

// Hook for categories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (type?: 'income' | 'expense') => {
    try {
      setLoading(true);
      const result = await api.getCategories(type);
      setCategories(result);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { categories, loading, refresh };
}

// Declare global Telegram type
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        backgroundColor: string;
        themeParams: {
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        expand: () => void;
        close: () => void;
        showAlert: (message: string) => void;
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
      };
    };
  }
}
