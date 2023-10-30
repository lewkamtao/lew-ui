import { ExtractPropTypes } from 'vue';

export const popoverProps = {
    trigger: {
        type: String,
        default: 'click',
        description: '触发方式，可选值为 click、hover、focus',
    },
    placement: {
        type: String,
        default: 'top',
        description:
            '弹出位置，可选值为 top、bottom、left、right、top-start、top-end、bottom-start、bottom-end、left-start、left-end、right-start、right-end',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用',
    },
    loading: {
        type: Boolean,
        default: false,
        description: '加载状态',
    },
    popoverBodyClassName: {
        type: String,
        default: 'lew-popover-body',
        description: '弹出框的类名',
    },
    triggerTarget: {
        type: Element,
        default: null,
        description: '触发元素',
    },
    offset: {
        type: Array,
        default: [0, 8],
        description: '偏移量',
    },
    hideOnClick: {
        type: [Boolean, String],
        default: true,
    },
};
export type PopoverProps = ExtractPropTypes<typeof popoverProps>;
