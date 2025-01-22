export interface Node {
    type: string;
    props: Record<string, any>;
    children: Node[];
    hooks?: {
        onMount?: (node: Node) => void;
        onUpdate?: (node: Node) => void;
        onUnmount?: (node: Node) => void;
    };
}

export function createNode(
    type: string,
    props: Record<string, any> = {},
    children: Node[] = [],
    hooks?: {
        onMount?: (node: Node) => void;
        onUpdate?: (node: Node) => void;
        onUnmount?: (node: Node) => void;
    }
): Node {
    return { type, props, children, hooks };
}
