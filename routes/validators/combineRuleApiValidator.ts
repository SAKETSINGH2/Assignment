import { body } from "express-validator";

export const combineRuleValidator = [
    body()
        .exists()
        .withMessage("A list of rules is required.")
        .isArray()
        .withMessage("Rules must be an array.")
        .custom((rules) => {
            if (rules.length === 0) {
                throw new Error("The rules array cannot be empty.");
            }
            return true;
        }),
];
