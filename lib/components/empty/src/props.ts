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
    width: {
        type: String,
        default: '200px',
        description: '宽度',
    },
    height: {
        type: String,
        default: 'auto',
        description: '高度',
    },
};

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
