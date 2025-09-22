import { useAccounts } from "./useAccounts";
import { useCategories } from "./useCategories";
import { useTransactions } from "./useTransactions";
import {
  expenseType,
  goalType,
  recentTransactionType,
  MonthlyData
} from "../types/dashboard.type";

export const useDashboard = () => {
  const accountsData = useAccounts();
  const categoriesData = useCategories();
  const transactionsData = useTransactions();
  const loading = !accountsData || !categoriesData || !transactionsData;
  const error = transactionsData.error || categoriesData.error || accountsData.error;

  const totalBalance = accountsData.accounts.reduce((acc, account) => {
    if (account.currency === 'USD') {
      return acc + account.balance * 18;
    } else if (account.currency === 'EUR') {
      return acc + account.balance * 20;
    }
    return acc + account.balance;
  }, 0);
  const totalIncome = transactionsData.transactions.filter(tx => tx.type === 'income').reduce((acc, tx) => acc + tx.amount, 0);
  const totalExpenses = transactionsData.transactions.filter(tx => tx.type === 'expense').reduce((acc, tx) => acc + tx.amount, 0);
  const totalSavings = transactionsData.transactions.filter(tx => tx.type === 'saving').reduce((acc, tx) => acc + tx.amount, 0);

  const monthlyData: MonthlyData[] = transactionsData.transactions.reduce((acc: MonthlyData[], tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
    let existingMonth = acc.find(m => m.month === month);
    if (!existingMonth) {
      existingMonth = { month, ingresos: 0, gastos: 0, balance: 0 };
      acc.push(existingMonth);
    }
    if (tx.type === 'income') {
      existingMonth.ingresos += tx.amount;
    } else if (tx.type === 'expense') {
      existingMonth.gastos += tx.amount;
    }
    existingMonth.balance = existingMonth.ingresos - existingMonth.gastos;
    return acc;
  }, []);

  const expenses: expenseType[] = transactionsData.transactions
    .filter(tx => tx.type === 'expense')
    .map(tx => {
      const category = categoriesData.categories.find(cat => String(cat.id) === tx.categoryId);
      return category ? {
        category: category.name,
        amount: Math.abs(tx.amount),
        color: category.color,
        percentage: totalExpenses !== 0
          ? (Math.abs(tx.amount) / Math.abs(totalExpenses)) * 100
          : 0
      } : null;
    })
    .filter((exp): exp is expenseType => exp !== null)
    .reduce((acc: expenseType[], curr) => {
      const existing = acc.find(e => e.category === curr.category);
      if (existing) {
        existing.amount += curr.amount;
        existing.percentage = totalExpenses !== 0
          ? (existing.amount / Math.abs(totalExpenses)) * 100
          : 0;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [])
    .sort((a, b) => b.amount - a.amount);

  const recentTransactions: recentTransactionType[] = transactionsData.transactions.map(tx => ({
    id: tx.id,
    note: tx.note,
    amount: tx.amount,
    date: new Date(tx.date).toDateString(),
    type: tx.type as 'income' | 'expense' | 'saving' | 'investment'
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const goalTypes = ['saving', 'ahorro', 'savings'];
  const goals: goalType[] = (accountsData?.accounts || [])
    .filter(acc => acc.type && goalTypes.some(type => acc.type.toLowerCase().includes(type)))
    .map(acc => ({
      id: acc.id,
      name: acc.name,
      target: acc.balanceLimit || 0,
      current: acc.balance || 0,
      progress: acc.balanceLimit  && acc.balanceLimit > 0? Math.min((acc.balance / acc.balanceLimit) * 100, 100) : 0
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
    loading,
    error
  };
};
