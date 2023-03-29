import { PropType, toRaw } from 'vue';

export type SelectOptions = {
    label: string;
    value: string;
    disabled?: boolean;
};

export type SelectSearchMethodParams = {
    label?: string;
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
    searchMode: {
        type: String,
        default: 'filter', //  filter,  custom
    },
    searchPlaceholder: {
        type: String,
        default: '',
    },
    searchMethod: {
        type: Function as PropType<(e: SelectSearchMethodParams) => void>,
        default: (e: SelectSearchMethodParams) => {
            if (e.label && e.keyword) {
                return e.label.indexOf(e.keyword) >= 0;
            } else {
                return false;
            }
        },
    },
    clearable: {
        type: Boolean,
        default: false,
    },
};
