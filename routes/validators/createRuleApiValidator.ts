import { body } from "express-validator";

export const createRuleValidator = [
    body("ruleString")
        .isString()
        .withMessage("ruleString must be a string.")
        .notEmpty()
        .withMessage("ruleString is required."),
];
