import Express from "express";
import type { Response } from "express";

const router = Express.Router();

router.get('/', (_req, res: Response) => {
    res.sendStatus(200);
})

export default router