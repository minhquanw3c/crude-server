import { Router } from "express";
import * as ChainService from "./../controllers/chain.controller";

const router = Router();

router.get("/", ChainService.getChains);

export default router;
