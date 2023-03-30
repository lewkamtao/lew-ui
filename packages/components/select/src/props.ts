import { PropType, toRaw } from 'vue';

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
        type: [String, Number],
        required: true,
    },
    options: {
        type: Array as PropType<SelectOptions[]>,
        default() {
            return [];
        },
        required: true,
        validator(options: SelectOptions[]) {
            const _options = toRaw(options);
            const arr = _options.map((e) => e.value);
            const newSet = new Set(arr);
            // 检查重复
            if (arr.length !== newSet.size) {
                throw new Error('lew-select：options 中 value 不能重复');
            }
            return options.length > 0;
        },
    },
    trigger: {
        type: String,
        default: 'click',
        validator(value: string) {
            return ['click', 'hover'].includes(value);
        },
    },
    labelSlot: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: '请选择',
    },
    size: {
        type: String,
        default: 'medium',
    },
    searchable: {
        type: Boolean,
        default: false,
    },
    searchPlaceholder: {
        type: String,
        default: '',
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
            } else {
                return [];
            }
        },
    },
    searchDelay: {
        type: Number,
        default: 250,
    },
    clearable: {
        type: Boolean,
        default: () => true,
    },
};
