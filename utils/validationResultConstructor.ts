import { Request } from "express";

import { validationResult } from "express-validator";

export default function (request: Request) {
    const result = validationResult(request);
    if (result.isEmpty()) {
        return null;
    }
    const errorMessages = result
        .formatWith((error) => error.msg.toString())
        .array();
    return errorMessages.join(" || ");
}
