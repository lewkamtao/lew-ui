import { boolean } from 'yup';

export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'columns',
            description: '表格配置',
            type: `Array<TableColumns>`,
            default: 500,
        },
        {
            name: 'dataSource',
            description: '数据来源',
            type: `array`,
            default: 500,
        },
        {
            name: 'v-model:selectedKey',
            description: '绑定选择值',
            type: 'array',
            default: 24,
        },
        {
            name: 'rowKey',
            description: '唯一key，用于选择',
            type: 'number | string',
            default: '-',
        },
        {
            name: 'checkable',
            description: '开启选择器',
            type: `boolean`,
            default: false,
        },

        {
            name: 'maxHeight',
            description: '最大高度',
            type: `number`,
            default: '-',
        },
    ],
};
