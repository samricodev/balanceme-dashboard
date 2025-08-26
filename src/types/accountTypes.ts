import { Transaction } from './transactionTypes';

interface Account {
  id: string;
  name: string;
  userId: string;
  type: string;
  currency: string;
  balance: number;
  transactions: Transaction[];
}

export type {
  Account
}