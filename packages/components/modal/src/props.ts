import { ExtractPropTypes } from 'vue';

export const modalProps = {
    title: {
        type: String,
        default: '',
        description: '标题',
    },
    width: {
        type: [String, Number],
        default: 'auto',
        description: '宽度',
    },
    height: {
        type: [String, Number],
        default: 'auto',
        description: '高度',
    },
    visible: {
        type: Boolean,
        default: false,
        description: '是否显示',
    },
    hideFooter: {
        type: Boolean,
        default: false,
        description: '是否隐藏底部按钮',
    },
    okText: {
        type: String,
        default: '确定',
        description: '确定按钮文字',
    },
    okColor: {
        type: String,
        default: 'primary',
        description: '确定按钮颜色',
    },
    cancelText: {
        type: String,
        default: '取消',
        description: '取消按钮文字',
    },
    cancelColor: {
        type: String,
        default: 'normal',
        description: '取消按钮颜色',
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: false,
        description: '点击遮罩层是否关闭',
    },
};
export type ModalProps = ExtractPropTypes<typeof modalProps>;
