export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name:'options',
            description: '配置表',
            type: 'BreadcrumbOptions',
            default: [],
        },
        {
            name:'iconType',
            description: '显示类型',
            type: `sprit | shoulder`,
            default: 'sprit',
        },
    ],
};
