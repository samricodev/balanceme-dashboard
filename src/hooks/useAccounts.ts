/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '../config/config';
import { Account } from '../types/account.type';
import { getAuthHeaders } from '../utils/getHeaders';
import { handleApiError } from '../utils/handleApiError';
import { useState, useEffect, useCallback } from 'react';

interface CreateAccountData {
  userId: string;
  name: string;
  type: string;
  currency: string;
  balance?: number;
}

interface UpdateAccountData {
  name?: string;
  type?: string;
  currency?: string;
  balance?: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = `${API_URL}/accounts`;

  // Fetch inicial de cuentas
  const fetchAccounts = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch(`${url}/${userId}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || 'Error fetching accounts');
      }

      const data = await response.json();
      setAccounts(Array.isArray(data) ? data : []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Crear nueva cuenta
  const createAccount = async (accountData: CreateAccountData): Promise<ApiResponse<Account>> => {
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }

      const dataToSend = {
        ...accountData,
        userId: userId,
        balance: accountData.balance || 0
      };

      console.log('Datos a enviar:', dataToSend);

      const response = await fetch(`${url}/register`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || 'Error al crear cuenta');
      }

      const newAccount = await response.json();
      
      // Actualizar estado local
      setAccounts(prev => [...prev, newAccount]);
      
      return { success: true, data: newAccount };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error('Error creating account:', error);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cuenta existente
  const updateAccount = async (accountId: string, accountData: UpdateAccountData): Promise<ApiResponse<Account>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${accountId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(accountData)
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || 'Error al actualizar cuenta');
      }

      const updatedAccount = await response.json();
      
      // Actualizar estado local
      setAccounts(prev => 
        prev.map(account => 
          account.id === accountId ? { ...account, ...updatedAccount } : account
        )
      );
      
      return { success: true, data: updatedAccount };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error('Error updating account:', error);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar cuenta
  const deleteAccount = async (accountId: string): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${accountId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage || 'Error al eliminar cuenta');
      }

      // Actualizar estado local
      setAccounts(prev => prev.filter(account => account.id !== accountId));
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error('Error deleting account:', error);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Refrescar cuentas manualmente
  const refetch = useCallback(async (): Promise<void> => {
    await fetchAccounts();
  }, [fetchAccounts]);

  // Limpiar error
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // Efecto inicial
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return {
    // Estados
    accounts,
    loading,
    error,
    
    // Operaciones CRUD
    createAccount,
    updateAccount,
    deleteAccount,
    
    // Utilidades
    refetch,
    clearError
  };
};