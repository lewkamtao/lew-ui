import { onUnmounted } from 'vue';

export function useDOMCreate(nodeId: string): void {
    const node = document.createElement('div');
    node.id = nodeId;
    document.body.appendChild(node);
    onUnmounted(() => {
        document.body.removeChild(node);
    });
}
