import { Transaction } from './transaction.type';

interface Account {
  id: string;
  name: string;
  type: string;
  currency: string;
  balance: number;
  transactions: Transaction[];
}

export type {
  Account
}