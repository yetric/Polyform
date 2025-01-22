import { Renderer } from '../core/renderer';
import { Node } from '../core/node';

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

        node.children.forEach((child) => this.render(child, el));
        parent.appendChild(el);
    }

    update(node: Node, parent: HTMLElement) {
        console.warn('Update logic not implemented yet!');
    }

    remove(node: Node, parent: HTMLElement) {
        console.warn('Remove logic not implemented yet!');
    }
}
