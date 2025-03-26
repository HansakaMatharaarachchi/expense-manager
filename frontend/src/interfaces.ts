import { ExpenseCategory } from "./constants";

export interface Expense {
	id: number;
	title: string;
	category: ExpenseCategory;
	description?: string;
	date: string;
	amount: number;
}
