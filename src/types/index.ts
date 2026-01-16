export interface User {
  id: number;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  language_code: string;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  user_id: number;
  name: string;
  emoji: string;
  type: 'income' | 'expense';
  is_default: boolean;
  created_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  category_id: number | null;
  amount: number;
  type: 'income' | 'expense';
  description: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  category_name?: string;
  category_emoji?: string;
}

export interface SavingsGoal {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  emoji: string;
  deadline: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Balance {
  total_income: number;
  total_expense: number;
  balance: number;
}

export interface MonthlySummary {
  year: number;
  month: number;
  income: number;
  expense: number;
  savings: number;
  categories: Array<{
    name: string;
    emoji: string;
    total: number;
  }>;
}

export interface DashboardData {
  user: User;
  balance: Balance;
  monthly_summary: MonthlySummary;
  recent_transactions: Transaction[];
  savings_goals: SavingsGoal[];
  categories: Category[];
}
