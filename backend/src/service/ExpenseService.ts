import { AppDataSource } from "../config/data-source";

import { Between } from "typeorm";
import { CreateExpenseDto, UpdateExpenseDto } from "../dto/expense.dto";
import { Expense, ExpenseCategory } from "../entity/Expense";

export class ExpenseService {
	private readonly expenseRepository = AppDataSource.getRepository(Expense);

	async getAllExpenses(category?: ExpenseCategory) {
		return this.expenseRepository.find({
			where: category ? { category } : undefined,
			order: { date: "DESC" },
		});
	}

	async createExpense(expenseData: CreateExpenseDto) {
		const expense = this.expenseRepository.create({
			...expenseData,
			date: new Date(expenseData.date),
		});
		return this.expenseRepository.save(expense);
	}

	async updateExpense(id: number, updateData: UpdateExpenseDto) {
		const existing = await this.expenseRepository.findOneBy({ id });
		if (!existing) return null;

		const merged = this.expenseRepository.merge(existing, {
			...updateData,
			date: updateData.date ? new Date(updateData.date) : existing.date,
		});

		return this.expenseRepository.save(merged);
	}

	async deleteExpense(id: number) {
		const result = await this.expenseRepository.delete(id);
		return result.affected > 0;
	}

	async getMonthlySummary() {
		const startDate = new Date();
		startDate.setDate(1);
		startDate.setHours(0, 0, 0, 0);

		const endDate = new Date(startDate);
		endDate.setMonth(startDate.getMonth() + 1);

		return this.expenseRepository
			.createQueryBuilder("expense")
			.select("category, SUM(amount) as total")
			.where({ date: Between(startDate, endDate) })
			.groupBy("category")
			.getRawMany();
	}
}
