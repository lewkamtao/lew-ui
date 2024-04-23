import type { ButtonProps } from '../../button/index';
import type { PropType } from 'vue';
export const popokProps = {
    type: {
        type: String,
        default: 'warning',
        description: '弹出框类型，可选值为 success、warning、error、info'
    },
    width: {
        type: [String, Number],
        default: '280px',
        description: '宽度'
    },
    trigger: {
        type: String,
        default: 'click',
        description: '触发方式，可选值为 hover、click'
    },
    title: {
        type: String,
        default: '',
        description: '标题'
    },
    okProps: {
        type: Object as PropType<ButtonProps>,
        default: () => {
            return {
                text: '确定',
                color: 'primary'
            };
        },
        description: '确定按钮文字'
    },
    cancelProps: {
        type: Object as PropType<ButtonProps>,
        default: () => {
            return {
                type: 'text',
                text: '取消',
                color: 'normal'
            };
        },
        description: '确定按钮文字'
    },
    content: {
        type: String,
        default: '',
        description: '内容'
    },
    placement: {
        type: String,
        default: 'top',
        description:
            '弹出位置，可选值为 top、bottom、left、right、top-start、top-end、bottom-start、bottom-end、left-start、left-end、right-start、right-end'
    }
};
