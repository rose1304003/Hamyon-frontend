import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/services/api';
import type { DashboardData, SavingsGoal, Transaction, Category } from '@/types';

// Global auth state to track if authentication is ready
let authReady = false;
let authReadyPromise: Promise<boolean> | null = null;
let authReadyResolve: ((value: boolean) => void) | null = null;

// Create promise that resolves when auth is ready
function getAuthReadyPromise(): Promise<boolean> {
  if (!authReadyPromise) {
    authReadyPromise = new Promise((resolve) => {
      authReadyResolve = resolve;
      // If auth is already ready, resolve immediately
      if (authReady) {
        resolve(true);
      }
    });
  }
  return authReadyPromise;
}

function setAuthReady() {
  authReady = true;
  if (authReadyResolve) {
    authReadyResolve(true);
  }
}

// Wait for auth to be ready before making API calls
export async function waitForAuth(): Promise<boolean> {
  return getAuthReadyPromise();
}

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
  const [isReady, setIsReady] = useState(false);
  const initAttempts = useRef(0);

  useEffect(() => {
    const initTelegram = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Tell Telegram the app is ready
        tg.ready();
        
        setWebApp(tg);
        
        // Debug logging
        console.log('Telegram WebApp detected');
        console.log('initData:', tg.initData ? 'present' : 'empty');
        console.log('initDataUnsafe:', JSON.stringify(tg.initDataUnsafe));
        
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
          api.setAuth(tg.initDataUnsafe.user.id.toString(), tg.initData);
          console.log('Auth set for user:', tg.initDataUnsafe.user.id);
          setIsReady(true);
          setAuthReady();
          return true;
        } else if (tg.initData) {
          // initData exists but user not parsed yet - try to extract from initData
          try {
            const params = new URLSearchParams(tg.initData);
            const userParam = params.get('user');
            if (userParam) {
              const userData = JSON.parse(decodeURIComponent(userParam));
              if (userData?.id) {
                setUser(userData);
                api.setAuth(userData.id.toString(), tg.initData);
                console.log('Auth set from initData parse:', userData.id);
                setIsReady(true);
                setAuthReady();
                return true;
              }
            }
          } catch (e) {
            console.error('Failed to parse initData:', e);
          }
        }
        
        // Expand the app to full height
        tg.expand();
        
        // Set theme
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
        
        return false;
      }
      return false;
    };

    // Try to initialize immediately
    if (initTelegram()) {
      return;
    }

    // If not successful, retry a few times (Telegram WebApp might load async)
    const retryInit = () => {
      initAttempts.current++;
      console.log(`Retry init attempt ${initAttempts.current}`);
      
      if (initTelegram()) {
        return;
      }
      
      // Try up to 10 times with increasing delays
      if (initAttempts.current < 10) {
        setTimeout(retryInit, initAttempts.current * 100);
      } else {
        // Give up - check for development mode
        console.log('Telegram WebApp NOT detected after retries, checking URL params');
        const params = new URLSearchParams(window.location.search);
        const telegramId = params.get('telegram_id');
        if (telegramId) {
          api.setAuth(telegramId);
          setUser({
            id: parseInt(telegramId),
            first_name: 'Test User',
          });
          setIsReady(true);
          setAuthReady();
        } else {
          // No auth available - still mark as ready but with no user
          console.warn('No authentication available');
          setIsReady(true);
          setAuthReady();
        }
      }
    };

    // Start retry after a short delay
    setTimeout(retryInit, 50);
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

  return { webApp, user, isReady, hapticFeedback, showAlert, close };
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
      // Wait for auth to be ready before making API call
      await waitForAuth();
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
      await waitForAuth();
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
      await waitForAuth();
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
      await waitForAuth();
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
        ready: () => void;
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
