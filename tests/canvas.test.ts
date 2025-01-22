import { CanvasRenderer } from "../src/renderers/canvas";
import { createNode } from "../src";
import { expect, test } from "vitest";

test("CanvasRenderer renders shapes", () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    const renderer = new CanvasRenderer(context);

    const shapeNode = createNode("shape", { x: 50, y: 50, width: 100, height: 100, color: "blue" });
    renderer.render(shapeNode);

    // Check canvas operations
    expect(context.fillStyle).toBe("#0000ff");
});
