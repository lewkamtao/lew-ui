// hooks/useDOMCreate.ts
import { onUnmounted } from 'vue';

function useDOMCreate(nodeId: string): void {
    const node = document.createElement('div');
    node.id = nodeId;
    document.body.appendChild(node);
    onUnmounted(() => {
        document.body.removeChild(node);
    });
}

export default useDOMCreate;
