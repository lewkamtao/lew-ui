import { PropType } from 'vue';

export const inputTagModel = {
    // 绑定值
    modelValue: {
        type: Array as PropType<string[]> | undefined,
        default: [],
        description: '绑定值'
    }
};
export const inputTagProps = {};
