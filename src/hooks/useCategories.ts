/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "../config/config";
import { Category } from "../types/category.type";
import { getAuthHeaders } from "../utils/getHeaders";
import { useState, useEffect, useCallback } from "react";
import { handleApiError } from "../utils/handleApiError";

interface CreateCategoryData {
  userId: string;
  name: string;
  type: string;
  color: string;
  icon: string;
  description: string;
  transactionCount: number;
  totalAmount: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = `${API_URL}/categories`;

  const fetchCategories = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`${url}/${userId}`, {
        headers: getAuthHeaders()
      });
      const errorMessage = await handleApiError(response);
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  const createCategory = async (categoryData: CreateCategoryData): Promise<ApiResponse<Category>> => {
    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID not found");
      }
      const dataToSend = {
        ...categoryData,
        userId: userId
      }

      console.log("Sending category data:", dataToSend);
      
      const response = await fetch(`${url}/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || 'Error al crear cuenta');
      }

      const newCategory = await response.json();

      setCategories((prev) => [...prev, newCategory]);

      return { success: true, data: newCategory };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error('Error creating account:', error);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Refrescar cuentas manualmente
  const refetch = useCallback(async (): Promise<void> => {
    await fetchCategories();
  }, [fetchCategories]);

  // Limpiar error
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { 
    // states
    categories, 
    loading, 
    error,

    // CRUD methods
    fetchCategories,
    createCategory,

    // Utility methods
    refetch,
    clearError
  };
}
