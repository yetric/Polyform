# Polyform

A flexible, platform-agnostic UI framework.

## Installation
```bash
npm install polyform
```

## Usage
```typescript

import { createNode, DOMRenderer } from 'polyform';

const app = createNode('container', {}, createNode('text', { text: 'Hello, Polyform!' }));

const renderer = new DOMRenderer();
renderer.render(app, document.body);
```
