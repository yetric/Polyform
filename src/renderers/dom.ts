import { Node } from '../core/node';
import { Renderer } from '../core/renderer';

export class DOMRenderer implements Renderer {
    render(node: Node, parent: HTMLElement) {
        const el = document.createElement(node.type);
        Object.entries(node.props).forEach(([key, value]) => {
            if (key.startsWith('on')) {
                el.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                el.setAttribute(key, value);
            }
        });

        // Call the onMount hook
        if (node.hooks?.onMount) node.hooks.onMount(node);

        node.children.forEach((child) => this.render(child, el));
        parent.appendChild(el);
    }

    update(node: Node, parent: HTMLElement) {
        const el = parent.querySelector(`#${node.props.id}`);
        if (!el) return;

        Object.entries(node.props).forEach(([key, value]) => {
            if (key.startsWith('on')) {
                el.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                el.setAttribute(key, value);
            }
        });

        // Call the onUpdate hook
        if (node.hooks?.onUpdate) node.hooks.onUpdate(node);
    }

    remove(node: Node, parent: HTMLElement) {
        const el = parent.querySelector(`#${node.props.id}`);
        if (el) {
            parent.removeChild(el);

            // Call the onUnmount hook
            if (node.hooks?.onUnmount) node.hooks.onUnmount(node);
        }
    }
}
