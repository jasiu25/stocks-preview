import Express from "express";
import { prisma } from "../prisma.js";
import { HttpError } from "../errors/HttpError.js";

const categoriesRouter = Express.Router();

categoriesRouter.get('/', async (req, res, next) => {
    try {
        const categories = await prisma.categories.findMany();
        res.json(categories);
    } catch(error) {
        next(error);
    }
})

categoriesRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await prisma.categories.findUnique({
            where: { id: parseInt(id) },
        })

        if (!category) return next(new HttpError(404, "Category not found"));

        res.json(category)
    } catch (error) {
        next(error)
    }
})

categoriesRouter.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;
        const response = await prisma.categories.create({
            data: {
                name
            }
        });
        res.status(201).json(response);
    } catch (error) {
        next(error)
    }
})

categoriesRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.categories.delete({
            where: { id: parseInt(id) },
        });
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
})

categoriesRouter.patch('/', async (req, res, next) => {
    try {
        const { id, name } = req.body;
        await prisma.categories.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

export default categoriesRouter;