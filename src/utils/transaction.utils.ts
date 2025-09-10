/* eslint-disable @typescript-eslint/no-explicit-any */

const formatCurrency = (amount: number, currency: string = 'MXN') => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(Math.abs(amount));
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getAmountDisplay = (transaction: any) => {
  let color = '';
  let display = '';
  if (transaction.type === 'income') {
    color = 'text-green-600';
    display = `+${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
  } else if (transaction.type === 'expense') {
    color = 'text-red-600';
    display = `-${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
  } else if (transaction.type === 'saving') {
    color = 'text-blue-600';
    display = `+${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
  } else if (transaction.type === 'investment') {
    color = 'text-purple-600';
    display = `+${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
  }
  return { color, display };
};

const getTransactionTypeDisplay = (type: string) => {
  switch (type) {
    case 'income':
      return {
        label: 'Ingreso',
        className: 'bg-green-100 text-green-800'
      };
    case 'expense':
      return {
        label: 'Gasto',
        className: 'bg-red-100 text-red-800'
      };
    case 'saving':
      return {
        label: 'Ahorro',
        className: 'bg-blue-100 text-blue-800'
      };
    case 'investment':
      return {
        label: 'Inversión',
        className: 'bg-purple-100 text-purple-800'
      };
    default:
      return {
        label: type,
        className: 'bg-gray-100 text-gray-800'
      };
  }
};

export { formatCurrency, formatDate, getAmountDisplay, getTransactionTypeDisplay };
