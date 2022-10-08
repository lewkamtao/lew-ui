import { PropType, toRaw } from 'vue';

export type LewSelectOptions = {
    label: string;
    value: string;
    disabled?: boolean;
};

export const selectProps = {
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: [String, Array<string>],
        required: true,
    },
    options: {
        type: Array as PropType<LewSelectOptions[]>,
        default() {
            return [];
        },
        required: true,
        validator(options: LewSelectOptions[]) {
            const _options = toRaw(options);
            if (_options.length == 0) {
                throw new Error(
                    'lew-select：options 必须为长度大于 0 的 Array',
                );
            }
            const arr = _options.map((e) => e.value);
            const newSet = new Set(arr);
            // 检查重复
            if (arr.length !== newSet.size) {
                throw new Error('lew-select：options 中 value 不能重复');
            }
            return options.length > 0;
        },
    },
    placement: {
        type: String,
        default: 'bottom-start',
    },
    trigger: {
        type: String,
        default: 'click',
        validator(value: string) {
            return ['click', 'hover'].includes(value);
        },
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    align: {
        type: String,
        default: 'left',
    },
    showIcon: {
        type: Boolean,
        default: true,
    },
    labelSlot: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'medium',
    },
};
