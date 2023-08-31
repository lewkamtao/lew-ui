import { ExtractPropTypes } from 'vue';

export const modalProps = {
    title: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
    visible: {
        type: Boolean,
        default: false,
    },
    hideFooter: {
        type: Boolean,
        default: false,
    },
    okText: {
        type: String,
        default: '确定',
    },
    okColor: {
        type: String,
        default: 'primary',
    },
    cancelText: {
        type: String,
        default: '取消',
    },
    cancelColor: {
        type: String,
        default: 'normal',
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: false,
    },
};
export type ModalProps = ExtractPropTypes<typeof modalProps>;
