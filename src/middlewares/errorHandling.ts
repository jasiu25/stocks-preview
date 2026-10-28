import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/HttpErrpr.js";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);

    if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }

    res.sendStatus(500);
}