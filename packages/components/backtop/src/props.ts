import { onMounted, onUnmounted } from 'vue';
export const backtopProps = {
    right: {
        type: Number,
        default: 40,
    },
    bottom: {
        type: Number,
        default: 40,
    },
    valveHeight: {
        type: Number,
        default: 50,
    },
    target: {
        type: String,
        default: '',
    },
};

export function useEventListener(target, event, callback) {
    onMounted(() => target.addEventListener(event, callback, true));
    onUnmounted(() => target.removeEventListener(event, callback, true));
}
