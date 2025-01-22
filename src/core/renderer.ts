import { Node } from './node';

export interface Renderer {
    render(node: Node, parent: any): void;
    update(node: Node, parent: any): void;
    remove(node: Node, parent: any): void;
}
