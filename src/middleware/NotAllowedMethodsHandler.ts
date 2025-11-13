import type { Request, Response, NextFunction } from "express";

interface NotAllowedMethosHandler {
    path: RegExp;
    methods: string[];
}

export const NotAllowedMethodsHandler =
    (allowedMethodsByPath: NotAllowedMethosHandler[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const isNotAllowedMethod = allowedMethodsByPath.some(
            ({ path, methods }) => path.test(req.path) && !methods.includes(req.method)
        );

        if (isNotAllowedMethod) {
            res.sendStatus(405);
        }

        next();
    };
