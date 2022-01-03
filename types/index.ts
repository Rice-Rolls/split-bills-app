export interface Bill {
	billName: string;
	participants: { name: string }[];
	target: string;
}

export interface Expense {
  total: number;
  title: string;
  description?: string;
  type: string;
  payer: string;
  per: Record<string, number>;
}

export interface ExpenseType {
  type: string;
  text: string;
  icon: JSX.Element;
}