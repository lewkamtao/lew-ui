/*
 * @Author: Kamtao
 * @Date: 2022-07-05 10:05:34
 * @LastEditTime: 2022-07-07 16:54:51
 * @Description:
 */

import { PropType } from 'vue';
import { TableColumns } from './types';

export const tableProps = {
    columns: {
        type: Array as PropType<TableColumns[]>,
        default: () => {
            return [];
        },
    },
    width: {
        type: String,
        default: () => {
            return '';
        },
    },
    height: {
        type: String,
        default: () => {
            return '';
        },
    },

    data: {
        type: Array as any,
        default: () => {
            return [];
        },
    },
};
