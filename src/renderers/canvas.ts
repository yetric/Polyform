import { Node } from "../core/node";
import { Renderer } from "../core/renderer";

export class CanvasRenderer implements Renderer {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    render(node: Node, parent?: Node) {
        switch (node.type) {
            case "container":
                // Containers are logical groupings, no direct drawing.
                node.children.forEach((child) => this.render(child, node));
                break;

            case "text":
                this.drawText(node);
                break;

            case "shape":
                this.drawShape(node);
                break;

            default:
                console.warn(`Unsupported node type: ${node.type}`);
        }

        // Trigger onMount hook
        if (node.hooks?.onMount) {
            node.hooks.onMount(node);
        }
    }

    update(node: Node, parent?: Node) {
        // Clear and redraw for simplicity
        this.clearCanvas();
        if (node.hooks?.onUpdate) {
            node.hooks.onUpdate(node);
        }
        this.render(node, parent);
    }

    remove(node: Node, parent?: Node) {
        // Clear and redraw for simplicity
        this.clearCanvas();
        if (node.hooks?.onUnmount) {
            node.hooks.onUnmount(node);
        }
        if (parent) {
            parent.children = parent.children.filter((child) => child !== node);
        }
        this.render(parent!);
    }

    private drawText(node: Node) {
        const { x = 0, y = 0, text = "", font = "16px Arial", color = "black" } = node.props;
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, x, y);
    }

    private drawShape(node: Node) {
        const { x = 0, y = 0, width = 50, height = 50, color = "black" } = node.props;
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    private clearCanvas() {
        const canvas = this.context.canvas;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
