export type NodeType = 'container' | 'text' | 'button' | 'image' | 'shape';

export interface Node {
    type: NodeType; // Use the abstract NodeType
    props: Record<string, any>;
    children: Node[];
    hooks?: {
        onMount?: (node: Node) => void;
        onUpdate?: (node: Node) => void;
        onUnmount?: (node: Node) => void;
    };
}

export function createNode(
    type: NodeType,
    props: Record<string, any> = {},
    children: Node[] = [],
    hooks: {
        onMount?: (node: Node) => void;
        onUpdate?: (node: Node) => void;
        onUnmount?: (node: Node) => void;
    } = {}
): Node {
    return { type, props, children, hooks };
}

