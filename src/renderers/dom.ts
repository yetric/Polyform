import { Node } from '../core/node';
import { Renderer } from '../core/renderer';

export class DOMRenderer implements Renderer {
    render(node: Node, parent: HTMLElement) {
        let el: HTMLElement;

        switch (node.type) {
            case 'container':
                el = document.createElement('div');
                break;
            case 'text':
                el = document.createElement('span');
                el.textContent = node.props.text || '';
                break;
            case 'button':
                el = document.createElement('button');
                el.textContent = node.props.label || '';
                if (node.props.onClick) {
                    el.addEventListener('click', node.props.onClick);
                }
                break;
            case 'image':
                el = document.createElement('img') as HTMLImageElement;
                if (node.props.src) {
                    (el as HTMLImageElement).src = node.props.src;
                }
                break;
            default:
                throw new Error(`Unsupported node type: ${node.type}`);
        }

        Object.entries(node.props).forEach(([key, value]) => {
            if (!['text', 'label', 'src', 'onClick'].includes(key)) {
                el.setAttribute(key, value);
            }
        });

        node.children.forEach((child) => this.render(child, el));
        parent.appendChild(el);

        if (node.hooks?.onMount) node.hooks.onMount(node);
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
