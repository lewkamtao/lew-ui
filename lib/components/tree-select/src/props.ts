import { PropType } from 'vue';
import type { TreeDataSource } from '../../tree';

export type TreeSelectOptions = {
    label: string;
    value: [string, number];
    labelPaths?: string[];
    valuePaths?: string[];
    level: number;
    isLeaf?: boolean;
    loading?: boolean;
    disabled?: boolean;
    parentLabelPaths?: string[];
    parentValuePaths?: string[];
    parentChildren?: TreeSelectOptions[];
    children?: TreeSelectOptions[];
};

export type TreeSelectTriggerType = 'click' | 'hover';

export const treeSelectModel = {
    modelValue: {
        type: [String, Number, undefined],
        default: '',
        description: '绑定值'
    }
};

export type TreeSelectSearchMethodParams = {
    options?: TreeDataSource[];
    keyword?: string;
};

export const treeSelectProps = {
    dataSource: {
        type: Array as PropType<TreeDataSource[]>,
        default: [],
        description: '配置列表'
    },
    trigger: {
        type: String,
        default: 'click',
        description: '触发方式，可选值为 click 或 hover'
    },
    placeholder: {
        type: String,
        default: '请选择',
        description: '默认提示语'
    },
    size: {
        type: String,
        default: 'medium',
        description: '尺寸，可选值为 small、medium、large'
    },
    searchable: {
        type: Boolean,
        default: false,
        description: '是否可搜索'
    },
    searchMethod: {
        type: Function as PropType<(e: TreeSelectSearchMethodParams) => void>,
        default: (params: TreeSelectSearchMethodParams) => {
            const { options, keyword } = params;
            if (options && keyword) {
                const reslut = options.filter((e) => {
                    return keyword && e.label.indexOf(keyword) >= 0;
                });
                return reslut;
            }
            return [];
        },
        description: '搜索方法'
    },
    searchDelay: {
        type: Number,
        default: 250,
        description: '搜索延迟，单位毫秒'
    },
    clearable: {
        type: Boolean,
        default: false,
        description: '是否可清空'
    },
    readonly: {
        type: Boolean,
        default: false,
        description: '是否只读'
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用'
    },
    align: {
        type: String,
        default: 'left',
        description: '对齐方式，可选值为 left、center、right'
    },
    showCheckIcon: {
        type: Boolean,
        default: true,
        description: '是否显示选中图标'
    },
    keyField: {
        type: String,
        default: 'key',
        description: '替代 TreeDataSource 中的 key 字段名，该字段值必须唯一。'
    },
    labelField: {
        type: String,
        default: 'label',
        description: '替代 TreeDataSource 中的 label 字段名'
    },
    disabledField: {
        type: String,
        default: 'disabled',
        description: '替代 TreeDataSource 中的 disabled 字段名'
    },
    defaultValue: {
        type: String,
        default: '',
        description: '默认值'
    }
};
