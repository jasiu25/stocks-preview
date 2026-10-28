import Express from "express";
import type { Response } from "express";
import itemsRouter from "./items.js";
import categoriesRouter from "./categories.js";

const router = Express.Router();

router.use("/items", itemsRouter);
router.use("/categories", categoriesRouter);

router.get('/', (_req, res: Response) => {
    res.sendStatus(200);
});

export default router