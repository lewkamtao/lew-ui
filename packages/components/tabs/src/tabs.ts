import { PropType, ExtractPropTypes } from 'vue';

export type TabsOptions = {
    label: string;
    value: [String, Number];
};

export const tabsProps = {
    modelValue: {
        type: [String, Number],
    },
    options: {
        type: Array as PropType<TabsOptions[]>,
        default() {
            return [];
        },
    },
    width: {
        type: String,
        default: '',
    },
    itemWidth: {
        type: Number,
    },
    round: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'block',
    },
};
export type TabsProps = ExtractPropTypes<typeof tabsProps>;
