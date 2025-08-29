/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect} from 'react';
import { API_URL } from '../config/config';
import { Account } from '../types/account.type';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = `${API_URL}/accounts`;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Error fetching accounts");
        }
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { accounts, loading, error };
};
