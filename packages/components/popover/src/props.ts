import { ExtractPropTypes } from 'vue';

export const popoverProps = {
    trigger: {
        type: String,
        default: 'click',
    },
    placement: {
        type: String,
        default: 'top',
    },
    disabled: {
        type: Boolean,
        default: () => false,
    },
    loading: {
        type: Boolean,
        default: () => false,
    },
    popoverBodyClassName: {
        type: String,
        default: 'lew-popover-body',
    },
    triggerTarget: {
        type: Element,
        default: null,
        required: false,
    },
    offset: {
        type: Array,
        default: [0, 8],
    },
};
export type PopoverProps = ExtractPropTypes<typeof popoverProps>;
