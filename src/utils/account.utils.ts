// Función para obtener el color según el tipo de cuenta
const getAccountTypeColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'ahorro':
    case 'savings':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'corriente':
    case 'checking':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'credito':
    case 'credit':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'inversion':
    case 'investment':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Función para formatear números como moneda
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency || 'MXN',
    minimumFractionDigits: 2
  }).format(amount || 0);
};

const getTextAccountType = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'ahorro':
    case 'savings':
      return 'Ahorro';
    case 'corriente':
    case 'checking':
      return 'Corriente';
    case 'credito':
    case 'credit':
      return 'Crédito';
    case 'inversion':
    case 'investment':
      return 'Inversión';
    default:
      return 'Tipo Desconocido';
  }
};

export { getAccountTypeColor, formatCurrency, getTextAccountType };
