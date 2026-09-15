import { Router, type IRouter } from "express";
import healthRouter from "./health";
import winovoRouter from "./winovo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(winovoRouter);

export default router;
