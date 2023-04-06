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
    triggerTarget: {
        type: Element,
        default: null,
        required: false,
    },
};
export type PopoverProps = ExtractPropTypes<typeof popoverProps>;
