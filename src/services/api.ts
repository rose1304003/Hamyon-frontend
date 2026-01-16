import type { 
  DashboardData, 
  Transaction, 
  SavingsGoal, 
  Category,
  Balance,
  MonthlySummary 
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'https://your-railway-app.up.railway.app';

class ApiService {
  private telegramId: string | null = null;
  private initData: string | null = null;

  setAuth(telegramId: string, initData?: string) {
    this.telegramId = telegramId;
    this.initData = initData || null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.telegramId) {
      headers['X-Telegram-Id'] = this.telegramId;
    }
    
    if (this.initData) {
      headers['X-Telegram-Init-Data'] = this.initData;
    }
    
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
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
      body: JSON.stringify(data),
    });
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.request(`/api/transactions/${id}`, { method: 'DELETE' });
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
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
  }

  async updateGoal(id: number, data: {
    name?: string;
    target_amount?: number;
    emoji?: string;
    deadline?: string;
  }): Promise<SavingsGoal> {
    return this.request<SavingsGoal>(`/api/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async contributeToGoal(id: number, amount: number, note?: string): Promise<SavingsGoal> {
    return this.request<SavingsGoal>(`/api/goals/${id}/contribute`, {
      method: 'POST',
      body: JSON.stringify({ amount, note }),
    });
  }

  async deleteGoal(id: number): Promise<void> {
    await this.request(`/api/goals/${id}`, { method: 'DELETE' });
  }
}

export const api = new ApiService();
export default api;
