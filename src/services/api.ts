
import type {
  DashboardData,
  Transaction,
  SavingsGoal,
  Category,
  Balance,
  MonthlySummary
} from '@/types';

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
  'https://your-railway-app.up.railway.app';

type TelegramWebApp = {
  initData?: string;
  initDataUnsafe?: {
    user?: { id?: number };
  };
};

function getTelegramWebApp(): TelegramWebApp | null {
  const w = window as any;
  return w?.Telegram?.WebApp ?? null;
}

class ApiService {
  private telegramId: string | null = null;
  private initData: string | null = null;

  /**
   * Optional manual override.
   * If you call this, it will take precedence over auto-detection.
   */
  setAuth(telegramId: string, initData?: string) {
    this.telegramId = telegramId;
    this.initData = initData || null;
  }

  /**
   * Auto-detect Telegram auth (works inside Telegram Mini App).
   */
  private getAutoAuth(): { telegramId?: string; initData?: string } {
    const tg = getTelegramWebApp();
    if (!tg) return {};

    const initData = tg.initData || '';
    const telegramId =
      tg.initDataUnsafe?.user?.id != null ? String(tg.initDataUnsafe.user.id) : undefined;

    return {
      initData: initData || undefined,
      telegramId
    };
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    // Prefer manually set auth (if provided)
    const manualTelegramId = this.telegramId || undefined;
    const manualInitData = this.initData || undefined;

    // Otherwise auto-detect from Telegram WebApp
    const auto = this.getAutoAuth();

    const telegramId = manualTelegramId ?? auto.telegramId;
    const initData = manualInitData ?? auto.initData;

    if (telegramId) headers['X-Telegram-Id'] = telegramId;
    if (initData) headers['X-Telegram-Init-Data'] = initData;

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {})
      }
    });

    // Read text first to avoid "Unexpected token <" when server returns HTML
    const raw = await response.text();

    // Try parse JSON if possible
    const tryJson = () => {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    };

    if (!response.ok) {
      const json = tryJson();
      const message =
        (json && (json.error || json.message)) ||
        `${response.status} ${response.statusText}: ${raw.slice(0, 200)}`;

      throw new Error(message);
    }

    // For 204 No Content
    if (response.status === 204) {
      return undefined as unknown as T;
    }

    const json = tryJson();
    if (json === null) {
      throw new Error(`Expected JSON but got: ${raw.slice(0, 120)}`);
    }

    return json as T;
  }

  // Dashboard
  async getDashboard(): Promise<DashboardData> {
    return this.request<DashboardData>('/api/dashboard');
  }

  // Balance
  async getBalance(): Promise<Balance> {
    return this.request<Balance>('/api/balance');
  }

  // Summary
  async getSummary(year?: number, month?: number): Promise<MonthlySummary> {
    const params = new URLSearchParams();
    if (year) params.append('year', year.toString());
    if (month) params.append('month', month.toString());

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<MonthlySummary>(`/api/summary${query}`);
  }

  // Transactions
  async getTransactions(options?: {
    limit?: number;
    offset?: number;
    type?: 'income' | 'expense';
    start_date?: string;
    end_date?: string;
  }): Promise<Transaction[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.type) params.append('type', options.type);
    if (options?.start_date) params.append('start_date', options.start_date);
    if (options?.end_date) params.append('end_date', options.end_date);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<Transaction[]>(`/api/transactions${query}`);
  }

  async createTransaction(data: {
    amount: number;
    type: 'income' | 'expense';
    category_id?: number;
    description?: string;
    date?: string;
  }): Promise<Transaction> {
    return this.request<Transaction>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.request<void>(`/api/transactions/${id}`, { method: 'DELETE' });
  }

  // Categories
  async getCategories(type?: 'income' | 'expense'): Promise<Category[]> {
    const query = type ? `?type=${type}` : '';
    return this.request<Category[]>(`/api/categories${query}`);
  }

  async createCategory(data: {
    name: string;
    emoji?: string;
    type?: 'income' | 'expense';
  }): Promise<Category> {
    return this.request<Category>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Savings Goals
  async getGoals(includeCompleted = true): Promise<SavingsGoal[]> {
    const query = `?include_completed=${includeCompleted}`;
    return this.request<SavingsGoal[]>(`/api/goals${query}`);
  }

  async getGoal(id: number): Promise<SavingsGoal> {
    return this.request<SavingsGoal>(`/api/goals/${id}`);
  }

  async createGoal(data: {
    name: string;
    target_amount: number;
    emoji?: string;
    deadline?: string;
  }): Promise<SavingsGoal> {
    return this.request<SavingsGoal>('/api/goals', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateGoal(
    id: number,
    data: {
      name?: string;
      target_amount?: number;
      emoji?: string;
      deadline?: string;
    }
  ): Promise<SavingsGoal> {
    return this.request<SavingsGoal>(`/api/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async contributeToGoal(id: number, amount: number, note?: string): Promise<SavingsGoal> {
    return this.request<SavingsGoal>(`/api/goals/${id}/contribute`, {
      method: 'POST',
      body: JSON.stringify({ amount, note })
    });
  }

  async deleteGoal(id: number): Promise<void> {
    await this.request<void>(`/api/goals/${id}`, { method: 'DELETE' });
  }
}

export const api = new ApiService();
export default api;
