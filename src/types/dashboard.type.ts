interface expenseType {
  category: string;
  amount: number;
  color: string;
  percentage: number;
}

interface recentTransactionType {
  id: string | number;
  note: string;
  amount: number;
  date: string;
  type: 'income' | 'expense' | 'saving' | 'investment';
}

interface MonthlyData {
  month: string;
  ingresos: number;
  gastos: number;
  balance: number;
}

interface goalType {
  id: string | number;
  name: string;
  target: number;
  current: number;
  progress: number;
}

export type {
  expenseType,
  recentTransactionType,
  MonthlyData,
  goalType
}