interface Category {
  id: number;
  name: string;
  type: string;
  color: string;
  icon: string;
  description: string;
  transactionCount: number;
  totalAmount: number;
  userId?: string;
}

export type { Category };