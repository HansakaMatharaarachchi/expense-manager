import "reflect-metadata";
import { DataSource } from "typeorm";
import { Expense } from "../entity/Expense";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "db/db.sqlite",
	synchronize: true,
	logging: false,
	entities: [Expense],
	migrations: [],
	subscribers: [],
});
