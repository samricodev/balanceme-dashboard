/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "../config/config";
import { getAuthHeaders } from "../utils/getHeaders";
import { Transaction } from "../types/transaction.type";
import { handleApiError } from "../utils/handleApiError";
import { useState, useEffect, useCallback } from "react";

interface CreateTransactionData {
  userId: string;
  accountId: string;
  categoryId: string;
  note: string;
  amount: number;
  type: 'income' | 'expense' | 'saving' | 'investment';
  date: string;
}

interface UpdateTransactionData {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  note: string;
  amount: number;
  type: 'income' | 'expense' | 'saving' | 'investment';
  date: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: number;
  };
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = `${API_URL}/transactions`;

  const fetchTransactions = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(`${url}/${userId}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || "Error fetching transactions");
      }

      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  //crear nueva transaccion
  const createTransaction = async (transactionData: CreateTransactionData): Promise<ApiResponse<Transaction>> => {
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const dataToSend = {
        ...transactionData,
        userId
      };

      const response = await fetch(`${url}/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || "Error creating transaction");
      }

      const newTransaction = await response.json();

      setTransactions(prev => [...prev, newTransaction]);

      return { success: true, data: newTransaction };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error("Error creating transaction:", error);
      return { success: false, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (transactionId: string, transactionData: UpdateTransactionData): Promise<ApiResponse<Transaction>> => {
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const dataToSend = {
        ...transactionData,
        userId
      };

      const response = await fetch(`${url}/${transactionId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || "Error updating transaction");
      }

      const updatedTransaction = await response.json();
      setTransactions(prev => prev.map(tx => (tx.id === transactionId ? updatedTransaction : tx)));
      return { success: true, data: updatedTransaction };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error("Error updating transaction:", error);
      return { success: false, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (transactionId: string): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${transactionId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || "Error deleting transaction");
      }

      setTransactions(prev => prev.filter(tx => tx.id !== transactionId));
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error("Error deleting transaction:", error);
      return { success: false, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  // Refrescar transacciones manualmente
  const refetch = useCallback(async (): Promise<void> => {
    await fetchTransactions();
  }, [fetchTransactions]);

  // Limpiar error
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // Efecto inicial
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    // Estados
    transactions,
    loading,
    error,

    // Operaciones CRUD
    createTransaction,
    updateTransaction,
    deleteTransaction,

    // Utilidades
    refetch,
    clearError
  };
}