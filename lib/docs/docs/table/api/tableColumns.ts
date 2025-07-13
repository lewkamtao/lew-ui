export default {
    title: 'TableColumns',
    columnsKey: 'props',
    data: [
        {
            name: 'field',
            description: '列数据在数据项中对应的字段名',
            type: 'string',
            default: '-',
        },
        {
            name: 'fixed',
            description: '列是否固定，可选 left 或 right',
            type: 'left | right',
            default: '-',
        },
        {
            name: 'title',
            description: '列头显示文字',
            type: 'string',
            default: '-',
        },
        {
            name: 'type',
            description:
                '列数据类型，text 为普通文本，text-trim 为自动省略的文本，template 为自定义模板',
            type: 'text | text-trim | template',
            default: 'text',
        },
        {
            name: 'width',
            description: '列宽度，单位为像素',
            type: 'number',
            default: '-',
        },
        {
            name: 'x',
            description: '设置列内容的水平对齐方式',
            type: 'start | center | end',
            default: '-',
        },
        {
            name: 'customRender',
            description: '自定义渲染函数，用于自定义列的内容',
            type: 'Function(object): VNode',
            default: '-',
        },
    ],
}
