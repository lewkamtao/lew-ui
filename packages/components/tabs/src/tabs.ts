import { PropType, ExtractPropTypes } from 'vue';

export type TabsOptions = {
    label: string;
    value: [String, Number];
};

export type TabsType = 'block' | 'line';
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
    size: {
        type: String,
        default: 'medium',
    },
    width: {
        type: [Number, String],
    },
    itemWidth: {
        type: [Number, String],
    },
    round: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String as PropType<TabsType>,
        default: 'block',
    },
};
export type TabsProps = ExtractPropTypes<typeof tabsProps>;
