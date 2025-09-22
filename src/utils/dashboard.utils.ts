import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

const formatCurrency = (amount: bigint | ValueType, currency = 'MXN') => {
  let numericAmount: number | bigint = 0;
  if (typeof amount === 'number' || typeof amount === 'bigint') {
    numericAmount = amount;
  } else if (typeof amount === 'string') {
    numericAmount = Number(amount);
  } else if (Array.isArray(amount) && amount.length > 0 && (typeof amount[0] === 'number' || typeof amount[0] === 'string')) {
    numericAmount = Number(amount[0]);
  }
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(numericAmount);
};

const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-MX', options);
};

const formatPercentage = (value: unknown) => {
  if (value === undefined || value === null) return '0%';
  const num = typeof value === 'number' || typeof value === 'bigint'
    ? Number(value)
    : parseFloat(String(value));
  return `${isNaN(num) ? '0' : Math.round(num)}%`;
};

const formatColorTransaction = (type: 'income' | 'expense' | 'saving' | 'investment') => {
  switch (type) {
    case 'income':
      return 'text-green-600';
    case 'expense':
      return 'text-red-600';
    case 'saving':
      return 'text-blue-600';
    case 'investment':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};

export {
  formatCurrency,
  formatDate,
  formatColorTransaction,
  formatPercentage
}