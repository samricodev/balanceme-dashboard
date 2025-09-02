// Función auxiliar para manejar errores de respuesta
export const handleApiError = async (response: Response): Promise<string> => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      return errorData.message || `Error ${response.status}: ${response.statusText}`;
    } catch {
      return `Error ${response.status}: ${response.statusText}`;
    }
  }
  return '';
};