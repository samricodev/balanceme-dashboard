// Función auxiliar para manejar errores de respuesta
export const handleApiError = async (response: Response): Promise<string> => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      // Manejo flexible de distintos formatos de error
      if (errorData.message) {
        return errorData.message;
      }
      if (typeof errorData.error === 'string') {
        if (errorData.error === "Insufficient funds in account") {
          return "El monto excede el balance disponible de la cuenta.";
        }
        if (errorData.error === "Account not found") {
          return "La cuenta seleccionada no existe.";
        }
        return errorData.error;
      }
      if (errorData.error && errorData.error.message) {
        return errorData.error.message;
      }
      // Mensaje especial para balance insuficiente
      if (response.status === 400 && errorData.code === 'INSUFFICIENT_BALANCE') {
        return 'El monto excede el balance disponible de la cuenta.';
      }
      // Otros casos
      return `Error ${response.status}: ${response.statusText}`;
    } catch {
      return `Error ${response.status}: ${response.statusText}`;
    }
  }
  return '';
};