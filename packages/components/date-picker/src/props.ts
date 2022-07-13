/*
 * @Author: Kamtao
 * @Date: 2022-07-04 12:15:55
 * @LastEditTime: 2022-07-13 17:14:45
 * @Description:
 */

export const datePickerProps = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        required: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
};

export const dateProps = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        required: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
};
