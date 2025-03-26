import {
	IsNotEmpty,
	IsString,
	IsEnum,
	IsNumber,
	IsPositive,
	IsDate,
	IsOptional,
	Min,
} from "class-validator";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

export enum ExpenseCategory {
	FOOD = "Food",
	TRANSPORTATION = "Transportation",
	HOUSEHOLD = "Household",
	HEALTH = "Health",
	SOCIAL_LIFE = "Social Life",
	MISCELLANEOUS = "Miscellaneous",
}

@Entity()
export class Expense {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsString()
	@IsNotEmpty()
	title: string;

	@Column({
		type: "simple-enum",
		enum: ExpenseCategory,
	})
	@IsEnum(ExpenseCategory)
	@IsNotEmpty()
	category: ExpenseCategory;

	@Column({ nullable: true })
	@IsString()
	@IsOptional()
	description?: string;

	@Column("date")
	@IsDate()
	@IsNotEmpty()
	date: Date;

	@Column("decimal")
	@IsNumber()
	@IsPositive()
	amount: number;

	@CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@UpdateDateColumn({
		type: "datetime",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
	})
	updatedAt: Date;
}
