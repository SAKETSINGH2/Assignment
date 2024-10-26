import { Request, Response, NextFunction } from "express";
import validationResultConstructor from "./validationResultConstructor";

export const requestParamsValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let reqValidationResult = validationResultConstructor(req);
    console.log(reqValidationResult);
    if (reqValidationResult) {
        return res
            .status(400)
            .json({ success: true, data: reqValidationResult });
    }

    return next();
};
