export function useDOMCreate(nodeId: string): void {
    let node = document.getElementById(nodeId) || document.createElement('div');
    node.id = nodeId;
    document.body.appendChild(node);
    onUnmounted(() => {
        try {
            if (node) document.body.removeChild(node);
        } catch {}
    });
}
