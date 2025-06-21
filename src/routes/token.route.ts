import { Router } from "express";
import * as TokenController from "./../controllers/token.controller";

const router = Router();

router.get("/", TokenController.getTokens);

export default router;
