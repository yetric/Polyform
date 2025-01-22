import { Node } from './node';

export type Component = (props: Record<string, any>, children?: Node[]) => Node;
