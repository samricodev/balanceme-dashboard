// Función para mostrar nombre y color según el tipo de transacción
export const getTransactionTypeDisplay = (type: string) => {
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