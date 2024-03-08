export const resultProps = {
    type: {
        type: String,
        default: 'info',
        description: '结果类型，可选值为 success、warning、error、info'
    },
    title: {
        type: String,
        default: '',
        description: '标题'
    },
    content: {
        type: String,
        default: '',
        description: '内容'
    }
};
