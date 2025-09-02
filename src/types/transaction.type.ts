interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  note: string;
}

export type {
  Transaction
}