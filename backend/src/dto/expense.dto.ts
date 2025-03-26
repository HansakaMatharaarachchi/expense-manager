import { Type } from "class-transformer";
import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from "class-validator";
import { ExpenseCategory } from "../entity/Expense";

export class CreateExpenseDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsDateString()
	date: Date;

	@IsString()
	@IsOptional()
	description?: string;

	@IsEnum(ExpenseCategory)
	category: ExpenseCategory;

	@IsNumber()
	@IsPositive()
	@Type(() => Number)
	amount: number;
}

export class UpdateExpenseDto {
	@IsString()
	@IsOptional()
	title?: string;

	@IsDateString()
	@IsOptional()
	date?: Date;

	@IsString()
	@IsOptional()
	description?: string;

	@IsEnum(ExpenseCategory)
	@IsOptional()
	category?: ExpenseCategory;

	@IsNumber()
	@IsPositive()
	@Type(() => Number)
	@IsOptional()
	amount?: number;
}
