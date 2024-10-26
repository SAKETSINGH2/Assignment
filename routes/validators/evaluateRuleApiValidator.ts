import { body } from "express-validator";

export const evaluateRuleApiValidator = [
    body("ast")
        .exists()
        .withMessage("AST is required.")
        .isObject()
        .withMessage("AST must be an object."),

    body("data")
        .exists()
        .withMessage("Data is required.")
        .isObject()
        .withMessage("Data must be an object."),
];
