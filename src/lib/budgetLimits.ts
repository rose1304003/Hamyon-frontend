// Budget Limits System

export interface BudgetLimit {
  id: string;
  category: string;
  limit: number;
  period: "weekly" | "monthly";
  createdAt: number;
}

export interface BudgetAlert {
  category: string;
  spent: number;
  limit: number;
  percentage: number;
  status: "safe" | "warning" | "exceeded";
}

const STORAGE_KEY = "hamyon_budget_limits";

export function getBudgetLimits(): BudgetLimit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveBudgetLimit(limit: BudgetLimit): void {
  const limits = getBudgetLimits();
  const existingIndex = limits.findIndex(l => l.category === limit.category);
  
  if (existingIndex !== -1) {
    limits[existingIndex] = limit;
  } else {
    limits.push(limit);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limits));
}

export function deleteBudgetLimit(id: string): void {
  const limits = getBudgetLimits();
  const filtered = limits.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getBudgetAlerts(
  limits: BudgetLimit[], 
  spendingByCategory: Record<string, number>
): BudgetAlert[] {
  return limits.map(limit => {
    const spent = spendingByCategory[limit.category] || 0;
    const percentage = limit.limit > 0 ? (spent / limit.limit) * 100 : 0;
    
    let status: "safe" | "warning" | "exceeded" = "safe";
    if (percentage >= 100) {
      status = "exceeded";
    } else if (percentage >= 80) {
      status = "warning";
    }
    
    return {
      category: limit.category,
      spent,
      limit: limit.limit,
      percentage: Math.min(percentage, 100),
      status
    };
  });
}

export function getTotalBudget(limits: BudgetLimit[]): number {
  return limits.reduce((sum, l) => sum + l.limit, 0);
}

export function getTotalSpentInLimits(
  limits: BudgetLimit[], 
  spendingByCategory: Record<string, number>
): number {
  return limits.reduce((sum, l) => {
    const spent = spendingByCategory[l.category] || 0;
    return sum + Math.min(spent, l.limit);
  }, 0);
}
