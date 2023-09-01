import { PropType, ExtractPropTypes } from 'vue';

export type DropdownOptions = {
    label: number | string;
    value: number | string;
};

export const dropdownProps = {
    options: {
        type: Array as PropType<DropdownOptions[]>,
        default: [],
        description: '下拉选项',
    },
    trigger: {
        type: String,
        default: 'hover',
        description: '触发方式，可选值为 hover、click',
    },
    placement: {
        type: String,
        default: 'bottom',
        description: '弹出位置，可选值为 top、bottom、left、right',
    },

    width: {
        type: [String, Number],
        default: '',
        description: '宽度',
    },
    maxHeight: {
        type: [String, Number],
        default: '300px',
        description: '最大高度',
    },
    align: {
        type: String,
        default: 'left',
        description: '水平对齐方式，可选值为 left、right',
    },
};

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;
