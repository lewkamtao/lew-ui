import { PropType } from 'vue';

export type SelectOptions = {
    label: string;
    value: string;
    disabled?: boolean;
};

export type SelectSearchMethodParams = {
    options?: SelectOptions[];
    keyword?: string;
};

export const selectProps = {
    modelValue: {
        type: [String, Number] || undefined,
        default: '',
        description: '绑定值'
    },
    options: {
        type: Array as PropType<SelectOptions[]>,
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
    searchPlaceholder: {
        type: String,
        default: '',
        description: '搜索提示语'
    },
    searchMethod: {
        type: Function as PropType<(e: SelectSearchMethodParams) => void>,
        default: (params: SelectSearchMethodParams) => {
            const { options, keyword } = params;
            if (options && keyword) {
                const reslut = options.filter((e) => {
                    return keyword && e.label.indexOf(keyword) >= 0;
                });
                return reslut;
            }
            return [];
        },
        description: '搜索方法，返回搜索结果列表。'
    },
    searchDelay: {
        type: Number,
        default: 500,
        description: '搜索延迟，单位毫秒，仅在 searchable 为 true 时有效'
    },
    clearable: {
        type: Boolean,
        default: () => false,
        description: '是否使用清空按钮'
    },
    readonly: {
        type: Boolean,
        default: () => false,
        description: '是否只读'
    },
    disabled: {
        type: Boolean,
        default: () => false,
        description: '是否禁用'
    },
    align: {
        type: String,
        default: 'left',
        description: '对齐方式，可选值为 left、center、right'
    },
    showCheckIcon: {
        type: Boolean,
        default: () => true,
        description: '是否显示选中图标'
    },
    defaultValue: {
        type: [String, Number] || undefined,
        default: '',
        description: '默认值'
    }
};
