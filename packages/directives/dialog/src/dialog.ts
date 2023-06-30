import { ButtonColor } from '../../../components/button/src/button';
import { PropType } from 'vue';
export const dialogProps = {
    visible: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: false,
    },
    iconType: {
        type: String,
        default: () => {
            return 'info';
        },
    },
    okText: {
        type: String,
        default: () => {
            return '确认';
        },
    },
    cancelText: {
        type: String,
        default: () => {
            return '取消';
        },
    },
    okButtonColor: {
        type: String as PropType<ButtonColor>,
        default: () => {
            return 'blue';
        },
    },
    cancelButtonColor: {
        type: String as PropType<ButtonColor>,
        default: () => {
            return 'gray';
        },
    },
    ok: {
        type: Function,
        default: () => {
            return true;
        },
    },
    cancel: {
        type: Function,
        default: () => {
            return true;
        },
    },
    layout: {
        type: String,
        default: 'normal', // normal or mini
    },
};
