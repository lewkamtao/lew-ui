import { PropType } from 'vue';

export const inputTagProps = {
    // 绑定值
    modelValue: {
        type: Array as PropType<string[]> | undefined,
        default: [],
        description: '绑定值'
    }
};
