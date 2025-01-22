import { createState } from "./state";

export type NodeType = "container" | "text" | "button" | "image" | "shape";

export interface Node {
    type: NodeType; // Use the abstract NodeType
    props: Record<string, any>;
    children: Node[];
    hooks?: {
        onMount?: (node: Node) => void;
        onUpdate?: (node: Node) => void;
        onUnmount?: (node: Node) => void;
    };
    state?: ReturnType<typeof createState<any>>; // Optional state property
}

export function createNode<T>(
    type: NodeType,
    props: Record<string, any> = {},
    children: Node[] = [],
    hooks: {
        onMount?: (node: Node) => void;
        onUpdate?: (node: Node) => void;
        onUnmount?: (node: Node) => void;
    } = {},
    initialState?: T, // Optional state initialization
): Node {
    const state = initialState !== undefined ? createState(initialState) : undefined;

    if (state) {
        // Automatically trigger `onUpdate` when state changes
        state.subscribe(() => {
            if (hooks.onUpdate) {
                hooks.onUpdate({ type, props, children, hooks, state });
            }
        });
    }

    return { type, props, children, hooks, state };
}
