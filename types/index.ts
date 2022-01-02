export interface FormValues {
	billName: string;
	participants: { name: string }[];
	target: string;
}

export interface Expense {
  total: number;
  title: string;
  description?: string;
  per: Record<string, number>;
}