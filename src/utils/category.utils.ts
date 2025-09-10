
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(amount || 0);
};

const getCategoryTypeDisplay = (type: string) => {
  switch (type) {
    case 'income':
      return {
        label: 'Ingreso',
        className: 'bg-green-100 text-green-800 border border-green-200'
      };
    case 'expense':
      return {
        label: 'Gasto',
        className: 'bg-red-100 text-red-800 border border-red-200'
      };
    case 'saving':
      return {
        label: 'Ahorro',
        className: 'bg-blue-100 text-blue-800 border border-blue-200'
      };
    case 'investment':
      return {
        label: 'Inversión',
        className: 'bg-purple-100 text-purple-800 border border-purple-200'
      };
    default:
      return {
        label: type,
        className: 'bg-gray-100 text-gray-800 border border-gray-200'
      };
  }
};

export { 
  formatCurrency, 
  getCategoryTypeDisplay 
};
