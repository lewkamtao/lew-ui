// hooks/useDOMCreate.ts
import { ComponentInternalInstance, getCurrentInstance, onMounted } from 'vue';
import type { Router } from 'vue-router';
let instance = null;

export default function useLewTo(): void {
    const lewTo = (path) => {
        const router = instance.appContext.config?.globalProperties
            .$router as Router;
        console.log(router);
        if (!path) return;
        if (path && path.startsWith('http')) {
            window.open(path);
        } else {
            router.push(path);
        }
    };
    onMounted(() => {
        instance = getCurrentInstance() as ComponentInternalInstance;
    });
    return {
        lewTo,
    };
}
