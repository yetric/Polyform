export interface Node {
    type: string;
    props: Record<string, any>;
    children: Node[];
}

export function createNode(
    type: string,
    props: Record<string, any> = {},
    ...children: Node[]
): Node {
    return { type, props, children };
}
