/*
 * @Author: Kamtao
 * @Date: 2022-07-04 12:15:55
 * @LastEditTime: 2022-07-07 16:55:35
 * @Description:
 */

import { PropType } from 'vue';

type Options = {
    label: string;
    value: string;
};

export const tabsProps = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
    width: {
        type: String,
        default: '',
    },
    itemWidth: {
        type: Array,
        default() {
            return [];
        },
    },
    round: {
        type: Boolean,
        default: false,
    },
};
