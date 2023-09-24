import { ExtractPropTypes } from 'vue';

export const backTopProps = {
    right: {
        type: Number,
        default: 40,
        description: '距离右边的距离',
    },
    bottom: {
        type: Number,
        default: 40,
        description: '距离底部的距离',
    },
    valveHeight: {
        type: Number,
        default: 50,
        description: '滚动高度达到此参数值才显示BackTop组件',
    },
    target: {
        type: String,
        default: '',
        description: '触发滚动的对象',
    },
};

export type BackTopProps = ExtractPropTypes<typeof backTopProps>;
