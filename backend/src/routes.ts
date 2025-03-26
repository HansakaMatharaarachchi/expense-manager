import { ExpenseController } from "./controller/ExpenseController";

export const Routes = [
	{
		method: "get",
		route: "/expenses",
		controller: ExpenseController,
		action: "getAllExpenses",
	},
	{
		method: "post",
		route: "/expenses",
		controller: ExpenseController,
		action: "createExpense",
	},
	{
		method: "put",
		route: "/expenses/:id",
		controller: ExpenseController,
		action: "updateExpense",
	},
	{
		method: "delete",
		route: "/expenses/:id",
		controller: ExpenseController,
		action: "deleteExpense",
	},
	{
		method: "get",
		route: "/expenses/summary",
		controller: ExpenseController,
		action: "getMonthlySummary",
	},
];
