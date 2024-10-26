import express, { Request, Response } from "express";
import Node, { Operand } from "../repository/RuleAst/node";
import { createRuleValidator } from "./validators/createRuleApiValidator";
import { requestParamsValidator } from "../utils/requestParamsValidator";
import { evaluateRuleApiValidator } from "./validators/evaluateRuleApiValidator";
import { combineRuleValidator } from "./validators/combineRuleApiValidator";

const router = express.Router();

const createAST = (ruleString: string): Node => {
    const operands = ruleString.split(/ (AND|OR) /);
    let root: Node | null = null;

    for (let i = 0; i < operands.length; i++) {
        const operand = operands[i].trim();
        if (operand.startsWith("(")) {
            const nestedAST = createAST(
                operand.substring(1, operand.length - 1)
            );
            root = root
                ? new Node(
                      "operator",
                      { key: "OR", operator: "OR", value: "" },
                      root,
                      nestedAST
                  )
                : nestedAST;
        } else {
            const parts = operand.split(" ");
            if (parts.length === 3) {
                const newOperand: Operand = {
                    key: parts[0],
                    operator: parts[1],
                    value: isNaN(Number(parts[2]))
                        ? parts[2]
                        : Number(parts[2]),
                };

                root = root
                    ? new Node(
                          "operator",
                          { key: "AND", operator: "AND", value: "" },
                          root,
                          new Node("operand", newOperand)
                      )
                    : new Node("operand", newOperand);
            }
        }
    }

    return root as Node;
};

router.post(
    "/create_rule",
    createRuleValidator,
    requestParamsValidator,
    (req: Request, res: Response) => {
        const { ruleString } = req.body;

        if (!ruleString) {
            return res
                .status(400)
                .json({ message: "Rule string is required." });
        }

        const ast = createAST(ruleString);
        res.status(200).json({
            message: "Rule created successfully.",
            ast,
        });
    }
);

router.post(
    "/combine_rules",
    combineRuleValidator,
    requestParamsValidator,
    (req: Request, res: Response) => {
        const { rules } = req.body;

        if (!Array.isArray(rules) || rules.length === 0) {
            return res
                .status(400)
                .json({ message: "A list of rules is required." });
        }

        const asts = rules.map((rule: string) => createAST(rule));
        let combinedAST: Node | null = null;

        asts.forEach((ast) => {
            combinedAST = combinedAST
                ? new Node(
                      "operator",
                      { key: "AND", operator: "AND", value: "" },
                      combinedAST,
                      ast
                  )
                : ast;
        });

        res.status(200).json({
            message: "Rules combined successfully.",
            ast: combinedAST,
        });
    }
);

const evaluateRule = (node: Node, data: Record<string, any>): boolean => {
    if (node.type === "operand") {
        const { key, operator, value } = node.value!;
        switch (operator) {
            case ">":
                return data[key] > value;
            case "<":
                return data[key] < value;
            case "=":
                return data[key] == value;
            default:
                return false;
        }
    } else if (node.type === "operator") {
        const leftEval = evaluateRule(node.left!, data);
        const rightEval = evaluateRule(node.right!, data);
        return node.value!.key === "AND"
            ? leftEval && rightEval
            : leftEval || rightEval;
    }
    return false;
};

router.post(
    "/evaluate_rule",
    evaluateRuleApiValidator,
    requestParamsValidator,
    (req: Request, res: Response) => {
        const { ast, data } = req.body;

        if (!ast || typeof data !== "object") {
            return res
                .status(400)
                .json({ message: "AST and data are required." });
        }

        const result = evaluateRule(ast, data);
        res.status(200).json({
            message: "Rule evaluated successfully.",
            result,
        });
    }
);

export default router;
