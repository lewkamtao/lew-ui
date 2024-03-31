import { PropType } from 'vue';

export type TreeDataSource = {
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
    children?: TreeDataSource[];
};

export type TreeTriggerType = 'click' | 'hover';

export const treeModel = {
    modelValue: {
        type: [String, Number],
        default: [],
        description: '值（双向绑定）'
    },
    expandedKeys: {
        type: [String, Number],
        default: [],
        description: '展开节点的 key 的集合'
    }
};

export const treeProps = {
    dataSource: {
        type: Array as PropType<TreeDataSource[]>,
        default: [],
        description: '配置项'
    },
    multiple: {
        type: Boolean,
        default: false,
        description: '多选的'
    },
    showCheckbox: {
        type: Boolean,
        default: false,
        description: '是否显示复选框'
    },
    showAllLevels: {
        type: Boolean,
        default: true,
        description: '是否展示所有层级'
    },
    free: {
        type: Boolean,
        default: false,
        description: '自由模式'
    },
    trigger: {
        type: String as PropType<TreeTriggerType>,
        default: 'click',
        description: '触发方式'
    },
    placeholder: {
        type: String,
        default: '请选择',
        description: '默认提示文案'
    },
    certainKeys: {
        type: Array as PropType<string[]>,
        default: []
    },
    size: {
        type: String,
        default: 'medium',
        description: '尺寸大小'
    },
    onload: {
        type: Function,
        default: undefined,
        description: '异步加载数据'
    },
    clearable: {
        type: Boolean,
        default: true,
        description: '是否支持清空'
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
    }
};
