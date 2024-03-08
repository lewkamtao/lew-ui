import { ExtractPropTypes } from 'vue';

export const dialogProps = {
    type: {
        type: String,
        default: '',
        description: '类型'
    },
    layout: {
        type: String,
        default: 'normal',
        description: '布局'
    },
    okText: {
        type: String,
        default: '确定',
        description: '确定按钮文字'
    },
    cancelText: {
        type: String,
        default: '取消',
        description: '取消按钮文字'
    },
    ok: {
        type: Function,
        default: () => {
            return true;
        },
        description: '确定回调'
    },
    cancel: {
        type: Function,
        default: () => {
            return true;
        },
        description: '取消回调'
    },

    closeOnClickOverlay: {
        type: Boolean,
        default: false,
        description: '点击遮罩层是否关闭'
    },
    closeByEsc: {
        type: Boolean,
        default: false,
        description: '是否允许esc关闭'
    },
    transformOrigin: {
        type: String,
        default: '0 0',
        description: '对话框原点位置（无需传参）'
    }
};
export type DialogProps = ExtractPropTypes<typeof dialogProps>;
