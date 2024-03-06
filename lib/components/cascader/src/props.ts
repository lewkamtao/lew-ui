import { PropType } from 'vue';

export type CascaderOptions = {
    label: string;
    value: [string, number];
    labelPaths?: string[];
    valuePaths?: string[];
    level?: number;
    isHasChild?: boolean;
    disabled?: boolean;
    parentLabelPaths?: string[];
    parentValuePaths?: string[];
    parentChildren?: CascaderOptions[];
    children?: CascaderOptions[];
};

export type CascaderTriggerType = 'click' | 'hover';

export const cascaderProps = {
    modelValue: {
        type: [String, Number],
        default: '',
        description: '值（双向绑定）'
    },
    options: {
        type: Array as PropType<CascaderOptions[]>,
        default: [],
        description: '配置项'
    },
    multiple: {
        type: Boolean,
        default: false,
        description: '多选的'
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
        type: String as PropType<CascaderTriggerType>,
        default: 'click',
        description: '触发方式'
    },
    placeholder: {
        type: String,
        default: '请选择',
        description: '默认提示文案'
    },
    size: {
        type: String,
        default: 'medium',
        description: '尺寸大小'
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
