interface Transaction {
  id: string;
  account: string;
  category: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  note: string;
}

export type {
  Transaction
}