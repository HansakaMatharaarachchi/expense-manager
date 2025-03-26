import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateExpenseDto, UpdateExpenseDto } from "../dto/expense.dto";
import { ExpenseService } from "../service/ExpenseService";
import { ExpenseCategory } from "../entity/Expense";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { HttpError } from "../middleware/errorMiddleware";

export class ExpenseController {
	private readonly expenseService = new ExpenseService();

	async getAllExpenses(req: Request, res: Response) {
		try {
			const category = req.query.category as ExpenseCategory;
			const expenses = await this.expenseService.getAllExpenses(category);

			sendSuccess(res, expenses);
		} catch (error) {
			sendError(res, 500, error.message);
		}
	}

	async createExpense(req: Request, res: Response) {
		try {
			const dto = plainToInstance(CreateExpenseDto, req.body);
			const errors = await validate(dto);

			if (errors.length > 0) {
				throw errors;
			}

			const expense = await this.expenseService.createExpense(dto);

			sendSuccess(res, expense, 201);
		} catch (error) {
			sendError(res, 400, error.message);
		}
	}

	async updateExpense(req: Request, res: Response) {
		try {
			const id = parseInt(req.params.id);
			if (isNaN(id)) throw new HttpError(400, "Invalid expense ID");

			const dto = plainToInstance(UpdateExpenseDto, req.body);
			const errors = await validate(dto, { skipMissingProperties: true });

			if (errors.length > 0) {
				throw errors;
			}

			const updated = await this.expenseService.updateExpense(id, dto);

			if (!updated) throw new HttpError(404, "Expense not found");

			sendSuccess(res, updated);
		} catch (error) {
			sendError(res, error.statusCode || 500, error.message);
		}
	}

	async deleteExpense(req: Request, res: Response) {
		try {
			const id = parseInt(req.params.id);

			if (isNaN(id)) throw new HttpError(400, "Invalid expense ID");

			const success = await this.expenseService.deleteExpense(id);

			if (!success) throw new HttpError(404, "Expense not found");

			sendSuccess(res, null, 204);
		} catch (error) {
			sendError(res, error.statusCode || 500, error.message);
		}
	}

	async getMonthlySummary(_req: Request, res: Response) {
		try {
			const summary = await this.expenseService.getMonthlySummary();

			sendSuccess(res, summary);
		} catch (error) {
			sendError(res, 500, error.message);
		}
	}
}
