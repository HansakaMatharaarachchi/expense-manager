import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./config/data-source";
import { Routes } from "./routes";
import * as cors from "cors";

AppDataSource.initialize()
	.then(async () => {
		const app = express();

		app.use(
			cors({
				origin: "http://localhost:5173",
			})
		);

		app.use(bodyParser.json());

		Routes.forEach((route) => {
			(app as any)[route.method](
				route.route,
				(req: Request, res: Response, next: Function) => {
					const result = new (route.controller as any)()[route.action](
						req,
						res,
						next
					);
					if (result instanceof Promise) {
						result.then((result) =>
							result !== null && result !== undefined
								? res.send(result)
								: undefined
						);
					} else if (result !== null && result !== undefined) {
						res.json(result);
					}
				}
			);
		});

		app.listen(3000);

		console.log("Express application is up and running on port 3000");
	})
	.catch((error) => console.log(error));
