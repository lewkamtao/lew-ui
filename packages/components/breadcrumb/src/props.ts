import { PropType } from 'vue';

export type Options = {
    label: string;
    to: string;
    active: boolean;
};

export const _props = {
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
    iconType: {
        type: String,
        default() {
            return 'sprit'; // shoulder ｜ sprit
        },
    },
};
