import { Request, Response } from "express";
import { INTERNAL_ERROR } from "../constants/messages";
import * as ChainService from "./../services/chain.service";

export async function getChains(req: Request, res: Response) {
	try {
		const chains = await ChainService.getChains();

		res.status(200).json({
			chains,
		});
	} catch (err) {
		res.status(500).json({
			message: err instanceof Error ? err.message : INTERNAL_ERROR,
		});
	}
}
