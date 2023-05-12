export function useDOMCreate(nodeId: string): void {
    let node = document.getElementById(nodeId);
    if (node) {
        document.body.appendChild(node);
    } else {
        node = document.createElement('div');
        node.id = nodeId;
    }
    onUnmounted(() => {
        if (node) document.body.removeChild(node);
    });
}
