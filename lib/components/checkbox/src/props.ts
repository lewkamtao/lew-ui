import type { ExtractPropTypes, PropType } from 'vue'
import type { LewSize, LewDirection } from 'lew-ui'
import { validSizes, validDirection } from 'lew-ui/constants'

export type CheckboxGroupDirectionType = 'x' | 'y'
export type CheckboxValue = string | number
export type CheckboxOptions = {
    label: string
    value: CheckboxValue
    disabled?: boolean
}

export const checkboxModel = {
    modelValue: {
        type: Boolean,
        default: false,
        description: '复选框的选中状态',
    },
}

export const checkboxGroupModel = {
    modelValue: {
        type: Array,
        default: () => [],
        required: true,
        description: '复选框组的选中值数组',
    },
}

export const checkboxProps = {
    label: {
        type: String,
        default: '',
        description: '复选框的标签文本',
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用复选框',
    },
    readonly: {
        type: Boolean,
        default: false,
        description: '是否将复选框设置为只读',
    },
    checked: {
        type: Boolean,
        default: false,
        description: '是否选中复选框',
    },
    size: {
        type: String as PropType<LewSize>,
        default: 'medium',
        description: '复选框的尺寸',
        validator: (value: LewSize) => {
            if (!validSizes.includes(value)) {
                console.warn(
                    '[LewCheckbox] 无效的 size 值，请使用 "small"、"medium" 或 "large"',
                )
                return false
            }
            return true
        },
    },
    block: {
        type: Boolean,
        default: false,
        description: '是否将复选框显示为块级元素',
    },
    round: {
        type: Boolean,
        default: false,
        description: '是否将复选框显示为圆形',
    },
    iconable: {
        type: Boolean,
        default: true,
        description: '是否显示复选框的图标',
    },
    certain: {
        type: Boolean,
        default: false,
        description: '复选框是否处于确定状态',
    },
}

export const checkboxGroupProps = {
    options: {
        type: Array as PropType<CheckboxOptions[]>,
        default: () => [],
        required: true,
        description: '复选框组的选项配置数组',
        validator: (value: CheckboxOptions[]) => {
            if (
                !Array.isArray(value) ||
                value.some((item) => typeof item !== 'object')
            ) {
                console.warn('[LewCheckboxGroup] options 必须是一个对象数组')
                return false
            }
            return true
        },
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用整个复选框组',
    },
    readonly: {
        type: Boolean,
        default: false,
        description: '是否将复选框组设置为只读',
    },
    size: {
        type: String as PropType<LewSize>,
        default: 'medium',
        description: '复选框组中复选框的尺寸',
        validator: (value: LewSize) => {
            if (!validSizes.includes(value)) {
                console.warn(
                    '[LewCheckboxGroup] 无效的 size 值，请使用 "small"、"medium" 或 "large"',
                )
                return false
            }
            return true
        },
    },
    direction: {
        type: String as PropType<LewDirection>,
        default: 'x',
        description: '复选框组的排列方向',
        validator: (value: LewDirection) => {
            if (!validDirection.includes(value)) {
                console.warn(
                    '[LewCheckboxGroup] 无效的 direction 值，请使用 "x" 或 "y"',
                )
                return false
            }
            return true
        },
    },
    block: {
        type: Boolean,
        default: false,
        description: '是否将复选框组显示为块级元素',
    },
    round: {
        type: Boolean,
        default: false,
        description: '是否将复选框组中的复选框显示为圆形',
    },
    iconable: {
        type: Boolean,
        default: true,
        description: '是否显示复选框的图标（仅在块状模式下生效）',
    },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
