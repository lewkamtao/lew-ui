import { ExtractPropTypes } from 'vue';
import { string } from 'yup';

export const textareaProps = {
    // 绑定值
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: 'medium',
    },
    focusSelect: {
        type: Boolean,
        default: false,
    },
    // 禁用
    disabled: {
        type: Boolean,
        default: false,
    },
    // 是否使用清空按钮
    clearable: {
        type: Boolean,
        default: () => false,
    },
    // 默认提示语
    placeholder: {
        type: String,
        default: '请输入',
    },
    // 是否只读
    readonly: {
        type: Boolean,
        default: false,
    },
    // 缩放模式
    resize: {
        type: String,
        default: 'none',
    },
    maxLength: {
        type: Number,
    },
    showCount: {
        type: Boolean,
        default: false,
    },
    renderCount: {
        type: Function,
        default: (value: string) => {
            return value?.length || 0;
        },
    },
    minHeight: {
        type: String,
        default: '80px',
    },
};
export type TextareaProps = ExtractPropTypes<typeof textareaProps>;
