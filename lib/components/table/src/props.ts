import { PropType } from 'vue';

export type TableColumns = {
    title: string;
    field: string;
    fixed: string;
    x: string;
    y: string;
    width: number;
    columnStyle: string;
};

export const tableProps = {
    rowKey: {
        type: String,
        default: 'id',
        description: '行key',
    },
    dataSource: {
        type: Array as any,
        default: [],
        description: '数据源',
    },
    columns: {
        type: Array as PropType<TableColumns[]>,
        default: [],
        description: '列配置',
    },
    maxHeight: {
        type: [Number, String],
        default: '',
        description: '最大高度',
    },
    checkable: {
        type: Boolean,
        default: false,
        description: '是否显示复选框',
    },
    singleSelect: {
        type: Boolean,
        default: false,
        description: '是否单选',
    },
};
