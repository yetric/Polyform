import { expect, test, vi } from 'vitest';
import { createNode, Node } from '../src';
import { DOMRenderer } from '../src';

test('Lifecycle hooks are called', () => {
    const onMount = vi.fn();
    const onUpdate = vi.fn();
    const onUnmount = vi.fn();

    const children: Node[] = [];

    const node = createNode(
        'div',
        {
            id: 'test',
        },
        children,
        {
            onMount,
            onUpdate,
            onUnmount,
        } // Pass hooks as a separate object
    );

    const renderer = new DOMRenderer();

    // Test onMount
    renderer.render(node, document.body);
    expect(onMount).toHaveBeenCalled();

    // Test onUpdate
    renderer.update(node, document.body);
    expect(onUpdate).toHaveBeenCalled();

    // Test onUnmount
    renderer.remove(node, document.body);
    expect(onUnmount).toHaveBeenCalled();
});
