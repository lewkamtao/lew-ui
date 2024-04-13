import { ExtractPropTypes } from 'vue';

export const textTrimProps = {
    text: {
        type: [String, Number, Boolean, Array],
        default: '',
        description: '文本内容'
    },
    allowHtml: {
        type: Boolean,
        default: false,
        description: 'HTML'
    },
    placement: {
        type: String,
        default: 'top',
        description: '方向'
    },
    offset: {
        type: Array,
        default: [0, 15],
        description: '偏移量'
    },
    x: {
        type: String,
        default: 'start', // center end
        description: '水平方向对齐方式'
    },
    delay: {
        type: Array,
        default: () => [80, 80],
        description: '延迟显示和隐藏的时间'
    },
    lineClamp: {
        type: Number,
        default: undefined,
        description: '行数'
    }
};

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>;
