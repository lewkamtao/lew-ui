export const popokProps = {
    type: {
        type: String,
        default: 'warning',
        description: '弹出框类型，可选值为 success、warning、error、info',
    },
    width: {
        type: [String, Number],
        default: '250px',
        description: '宽度',
    },
    trigger: {
        type: String,
        default: 'click',
        description: '触发方式，可选值为 hover、click',
    },
    title: {
        type: String,
        default: '',
        description: '标题',
    },
    ok: {
        type: Function,
        description: '确认回调',
    },
    cancel: {
        type: Function,
        description: '取消回调',
    },
    content: {
        type: String,
        default: '',
        description: '内容',
    },
    placement: {
        type: String,
        default: 'top',
        description:
            '弹出位置，可选值为 top、bottom、left、right、top-start、top-end、bottom-start、bottom-end、left-start、left-end、right-start、right-end',
    },
};
