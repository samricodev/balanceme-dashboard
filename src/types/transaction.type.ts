interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number;
  date: string;
  note: string;
}

export type {
  Transaction
}