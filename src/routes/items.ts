import Express from "express";
import { prisma } from "../prisma.js";
import { HttpError } from "../errors/HttpErrpr.js";

const itemsRouter = Express.Router();

itemsRouter.get('/', async (req, res, next) => {
    try {
        const items = await prisma.stockAccount.findMany({
            include: { category: true }
        });
        res.json(items);
    } catch(error) {
        next(error);
    }
})

itemsRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await prisma.stockAccount.findUnique({
            where: { id: parseInt(id) },
            include: { category: true }
        })

        if (!item) return next(new HttpError(404, "Item not found"));

        res.json(item)
    } catch (error) {
        next(error)
    }
})

export default itemsRouter;