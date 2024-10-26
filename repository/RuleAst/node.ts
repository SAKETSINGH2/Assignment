export type Operand = {
    key: string;
    operator: string;
    value: number | string;
};

class Node {
    type: "operator" | "operand";
    value?: Operand;
    left: Node | null;
    right: Node | null;

    constructor(
        type: "operator" | "operand",
        value?: Operand,
        left: Node | null = null,
        right: Node | null = null
    ) {
        this.type = type;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

export default Node;
