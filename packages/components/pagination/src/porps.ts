/*
 * @Author: Kamtao
 * @Date: 2022-07-07 09:22:34
 * @LastEditTime: 2022-07-08 16:17:33
 * @Description:
 */

export const paginationProps = {
    total: {
        type: Number,
        default: 100,
    },
    pageNum: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 20,
    },
    pageShowSize: {
        type: Number,
        default: 3,
    },
    background: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
};
