import { describe, expect, test, vi } from "vitest";
import { createNode } from "../src";
import { DOMRenderer } from "../src";

describe("createNodeWithState", () => {
    test("createNode without state works", () => {
        const node = createNode("text", { text: "Hello, World!" });
        expect(node.type).toBe("text");
        expect(node.props.text).toBe("Hello, World!");
        expect(node.state).toBeUndefined();
    });

    test("createNode with state triggers onUpdate", () => {
        const onUpdate = vi.fn();

        const node = createNode(
            "text",
            { id: "test", text: "Initial State" },
            [],
            { onUpdate },
            0, // Initial state
        );

        expect(node.state).toBeDefined();
        expect(node.state?.get()).toBe(0);

        // Update state
        node.state?.set(1);

        // Verify onUpdate was called
        expect(onUpdate).toHaveBeenCalled();
        expect(onUpdate).toHaveBeenCalledWith(
            expect.objectContaining({ type: "text", state: expect.anything() }),
        );
    });

    test("State updates propagate to the DOM", () => {
        const onUpdate = vi.fn((node) => {
            node.props.text = `Count: ${node.state?.get()}`;
        });

        const node = createNode(
            "text",
            { id: "counter", text: "Count: 0" },
            [],
            { onUpdate },
            0, // Initial state
        );

        const renderer = new DOMRenderer();
        const container = document.createElement("div");

        // Initial render
        renderer.render(node, container);
        expect(container.textContent).toBe("Count: 0");

        // Update state
        node.state?.set(1);

        // Verify onUpdate updated the DOM
        expect(container.textContent).toBe("Count: 1");
    });
});
