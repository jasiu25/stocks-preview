import { describe, expect, it, jest } from "@jest/globals";
import type { NextFunction, Request, Response } from "express";
import { errorHandler } from "../src/middlewares/errorHandling.js";
import { HttpError } from "../src/errors/HttpErrpr.js";

describe("Error handler", () => {
    it("Respond with status 500", () => {
        const error = new HttpError(500, "Something went wrong");
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;
        const next = jest.fn() as unknown as NextFunction;

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
    })

    it("Log the error", () => {
        const error = new HttpError(500, "Something went wrong");
        const logSpy = jest.spyOn(console, "log").mockImplementation(()  => {})

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;
        const next = jest.fn() as unknown as NextFunction;

        errorHandler(error, req, res, next);

        expect(logSpy).toHaveBeenCalledWith(error);
    })

    it("Imitate user not found error", () => {
        const error = new HttpError(404, "User not found");
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;
        const next = jest.fn() as unknown as NextFunction;

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(logSpy).toHaveBeenCalledWith(error);
    })
});