import { Node } from "../core/node";
import { Renderer } from "../core/renderer";

export class DOMRenderer implements Renderer {
    render(node: Node, parent: HTMLElement) {
        let el: HTMLElement;

        // Create element based on type
        switch (node.type) {
            case "text":
                el = document.createElement("span");
                el.textContent = node.props.text || "";
                break;
            default:
                el = document.createElement(node.type);
        }

        // Set attributes
        Object.entries(node.props).forEach(([key, value]) => {
            if (key !== "text") {
                el.setAttribute(key, value);
            }
        });

        // Render children
        node.children.forEach((child) => this.render(child, el));
        parent.appendChild(el);

        // Trigger onMount
        if (node.hooks?.onMount) {
            node.hooks.onMount(node);
        }

        // Attach state subscriptions
        if (node.state) {
            node.state.subscribe(() => {
                this.update(node, el);
            });
        }
    }

    update(node: Node, parent: HTMLElement) {
        if (node.props.text) {
            parent.textContent = node.props.text;
        }
        if (node.hooks?.onUpdate) {
            node.hooks.onUpdate(node);
        }
    }

    remove(node: Node, parent: HTMLElement) {
        if (node.hooks?.onUnmount) {
            node.hooks.onUnmount(node);
        }
        parent.removeChild(parent.querySelector(`#${node.props.id}`)!);
    }
}
