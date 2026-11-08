import Express from "express";
import { prisma } from "../prisma.js";
import { HttpError } from "../errors/HttpError.js";

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

itemsRouter.post('/', async (req, res, next) => {
    try {
        const { name, quantity, categoryId } = req.body;
        const response = await prisma.stockAccount.create({
            data: { name, quantity, categoryId },
            select: { id: true },
        });
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
})

itemsRouter.delete(`/:id`, async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.stockAccount.delete({
            where: { id: parseInt(id) },
        });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

itemsRouter.patch('/', async (req, res, next) => {
    try {
        const { id, name, quantity, categoryId } = req.body;
        await prisma.stockAccount.update({
            where: { id: parseInt(id) },
            data: { name, quantity, categoryId },
        });
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
})

export default itemsRouter;