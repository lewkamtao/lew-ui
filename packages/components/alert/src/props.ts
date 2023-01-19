import { PropType } from 'vue';

// alert type
export type Alert = {
    type: string;
    title: string;
    content?: string;
    isShowCloseBtn?: boolean;
};

export const _props = {
    list: {
        type: Array as PropType<Alert[]>,
        default() {
            return [];
        },
    },
};
