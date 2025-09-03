import { useAccounts } from "./useAccounts";
import { useCategories } from "./useCategories";
import { useTransactions } from "./useTransactions";

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

export const useDashboard = () => {
  const accountsData = useAccounts();
  const categoriesData = useCategories();
  const transactionsData = useTransactions();
  const loading = !accountsData || !categoriesData || !transactionsData;

  // Totals
  const totalBalance = accountsData.accounts.reduce((acc, account) => acc + account.balance, 0);
  const totalIncome = transactionsData.transactions.filter(tx => tx.type === 'income').reduce((acc, tx) => acc + tx.amount, 0);
  const totalExpenses = transactionsData.transactions.filter(tx => tx.type === 'expense').reduce((acc, tx) => acc + tx.amount, 0);
  const totalSavings = transactionsData.transactions.filter(tx => tx.type === 'saving').reduce((acc, tx) => acc + tx.amount, 0);

  const monthlyData: MonthlyData[] = transactionsData.transactions.reduce((acc: MonthlyData[], tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(m => m.month === month);
    if (existingMonth) {
      if (tx.type === 'income') {
        existingMonth.ingresos += tx.amount;
      } else {
        existingMonth.gastos += tx.amount;
      }
    } else {
      acc.push({
        month,
        ingresos: tx.type === 'income' ? tx.amount : 0,
        gastos: tx.type === 'expense' ? tx.amount : 0,
        balance: (tx.type === 'income' ? tx.amount : 0) - (tx.type === 'expense' ? tx.amount : 0)
      });
    }
    return acc;
  }, []);

  const expenses: expenseType[] = categoriesData.categories
    .map(category => {
      if (category.type === 'expense' && category.totalAmount !== 0) {
        return {
          category: category.name,
          amount: Math.abs(category.totalAmount),
          color: category.color,
          percentage: totalExpenses !== 0
            ? (Math.abs(category.totalAmount) / Math.abs(totalExpenses)) * 100
            : 0
        };
      }
      return null;
    })
    .filter((exp): exp is expenseType => exp !== null);

  const recentTransactions: recentTransactionType[] = transactionsData.transactions.map(tx => ({
    id: tx.id,
    note: tx.note,
    amount: tx.amount,
    date: new Date(tx.date).toDateString(),
    type: tx.type as 'income' | 'expense' | 'saving' | 'investment'
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const goals: goalType[] = (accountsData?.accounts || [])
  .filter(acc => acc.type?.toLowerCase() === 'saving')
  .map(acc => ({
    id: acc.id,
    name: acc.name,
    target: acc.balance * 2,
    current: acc.balance,
    progress: (acc.balance / (acc.balance * 2)) * 100
  }));


  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    totalSavings,
    accounts: accountsData,
    categories: categoriesData,
    transactions: transactionsData,
    monthlyData,
    expenses,
    recentTransactions,
    goals,
    loading
  };
};
