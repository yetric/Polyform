import { describe, test, expect } from "vitest";
import { createNode } from "../src";
describe("createNode", () => {
    test("createNode should return a valid node", () => {
        const node = createNode("container", { id: "test" });
        expect(node.type).toBe("container");
        expect(node.props.id).toBe("test");
        expect(node.children).toEqual([]);
    });
});
