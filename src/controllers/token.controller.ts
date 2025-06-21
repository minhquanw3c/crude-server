import { Request, Response } from "express";
import { INTERNAL_ERROR } from "../constants/messages";
import * as TokenService from "./../services/token.service";

export async function getTokens(req: Request, res: Response) {
	try {
		const tokens = await TokenService.getTokens();

		res.status(200).json({
			tokens,
		});
	} catch (err) {
		res.status(500).json({
			message: err instanceof Error ? err.message : INTERNAL_ERROR,
		});
	}
}
