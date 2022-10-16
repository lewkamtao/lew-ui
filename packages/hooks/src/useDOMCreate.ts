export function useDOMCreate(nodeId: string): void {
    const node = document.createElement('div');
    node.id = nodeId;
    document.body.appendChild(node);
    onUnmounted(() => {
        if (node) document.body.removeChild(node);
    });
}
