import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export const errorHandler = (error: Error, req: Request, res: Response) => {
    console.log(error);

    if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }

    res.sendStatus(500);
}