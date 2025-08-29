/* eslint-disable react-hooks/exhaustive-deps */
import { API_URL } from "../config/config";
import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction.type";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const url = `${API_URL}/transactions`;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("userId");
        const response = await fetch(`${url}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
}