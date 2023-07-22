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
        type: [String, Number],
    },
    options: {
        type: Array as PropType<SelectOptions[]>,
        default() {
            return [];
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
            }
            return [];
        },
    },
    searchDelay: {
        type: Number,
        default: 250,
    },
    clearable: {
        type: Boolean,
        default: () => false,
    },
    readonly: {
        type: Boolean,
        default: () => false,
    },
    disabled: {
        type: Boolean,
        default: () => false,
    },
    itemHeight: {
        type: Number,
        default: 30,
    },
    align: {
        type: String,
        default: 'left',
    },
    showCheckIcon: {
        type: Boolean,
        default: () => true,
    },
    defaultValue: {
        type: String,
        default: '',
    },
};
