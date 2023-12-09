import { ExtractPropTypes, PropType } from 'vue';

type EmptyType =
    | '404'
    | 'address'
    | 'article'
    | 'goods'
    | 'likes'
    | 'car'
    | 'comments'
    | 'network'
    | 'order'
    | 'search';

export const emptyProps = {
    type: {
        type: String as PropType<EmptyType>,
        default: 'search',
        typeDesc: `404
        | address
        | article
        | goods
        | likes
        | car
        | comments
        | network
        | order
        | search`,
        description: '类型',
    },
    title: {
        type: String,
        default: '暂无数据',
        description: '标题',
    },
};

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
