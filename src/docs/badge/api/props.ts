export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'value',
            description:
                '此项为空，则默认显示一个点。',
            type: 'string | number',
            default: 'undefined',
        },
        {
            name:'color',
            description: '显示色彩类型',
            type:  `red
            | orange
            | yellow
            | green
            | mint
            | teal
            | cyan
            | blue
            | indigo
            | purple
            | pink
            | gray
            | brown`,
            default: 'normal',
        },
    ],
};
