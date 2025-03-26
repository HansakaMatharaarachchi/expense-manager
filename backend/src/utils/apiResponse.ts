import { Response } from "express";

export function sendSuccess(res: Response, data: any, statusCode = 200) {
	res.status(statusCode).json({
		success: true,
		data,
	});
}

export function sendError(res: Response, statusCode: number, message: string) {
	res.status(statusCode).json({
		success: false,
		error: message,
	});
}
