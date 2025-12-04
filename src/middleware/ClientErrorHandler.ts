import type { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequest";
import ResourceNotFound from "../errors/ResourceNotFound";

export const ClientErrorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) return next(err);

    if (err instanceof BadRequestError || err instanceof ResourceNotFound) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (err instanceof Error) {
        return res.status(500).json({ error: "Oop! Algo ha ocurrido por favor intente de nuevo." });
    }
};
