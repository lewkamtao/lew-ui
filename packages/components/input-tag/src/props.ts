import { PropType } from 'vue';

export const inputTagProps = {
    // 绑定值
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: Array as PropType<string[]> | undefined,
        default: () => {
            return [];
        },
    },
    // tag类型
    type: {
        type: String,
        default: 'normal',
    },
};
