import { Request, Response } from "express";
import { ValidationError } from "class-validator";
import { sendError } from "../utils/apiResponse";

export class HttpError extends Error {
	constructor(public statusCode: number, message: string) {
		super(message);
	}
}

export function errorMiddleware(
	err: Error | HttpError | ValidationError[],
	_req: Request,
	res: Response
) {
	if (err instanceof HttpError) {
		return sendError(res, err.statusCode, err.message);
	}

	if (Array.isArray(err) && err[0] instanceof ValidationError) {
		const messages = err.flatMap((e) => Object.values(e.constraints || {}));

		return sendError(res, 400, messages.join(", "));
	}

	console.error(err);
	sendError(res, 500, "Internal Server Error");
}
