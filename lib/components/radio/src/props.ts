import type { LewDirection, LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import { validDirection, validSizes } from 'lew-ui/constants'

export type RadioDirection = 'x' | 'y'

export interface RadioOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export const radioProps = {
  checked: {
    type: Boolean,
    default: false,
    description: '是否选中',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用',
  },
  iconable: {
    type: Boolean,
    default: true,
    description: '是否显示图标',
  },
  label: {
    type: String,
    default: '',
    description: '单选框文本',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读',
  },
  round: {
    type: Boolean,
    default: true,
    description: '是否为圆角样式',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn(
          '[LewRadio] 无效的 size 值，请使用 "small"、"medium" 或 "large"',
        )
        return false
      }
      return true
    },
  },
  block: {
    type: Boolean,
    default: false,
    description: '是否为块级元素',
  },
}

export const radioGroupModel = {
  modelValue: {
    type: [String, Number],
    default: '',
    description: '单选框组绑定值',
  },
}

export const radioGroupProps = {
  block: {
    type: Boolean,
    default: false,
    description: '是否为块级元素',
  },
  direction: {
    type: String as PropType<LewDirection>,
    default: 'x',
    description: '复选框组的排列方向',
    validator: (value: LewDirection) => {
      if (!validDirection.includes(value)) {
        console.warn('[LewRadioGroup] 无效的 direction 值，请使用 "x" 或 "y"')
        return false
      }
      return true
    },
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用所有单选框',
  },
  iconable: {
    type: Boolean,
    default: true,
    description: '是否显示图标',
  },
  options: {
    type: Array as PropType<RadioOptions[]>,
    default: () => [],
    description: '单选框选项数组',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读',
  },
  round: {
    type: Boolean,
    default: true,
    description: '是否为圆角样式',
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '复选框组中复选框的尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn(
          '[LewRadioGroup] 无效的 size 值，请使用 "small"、"medium" 或 "large"',
        )
        return false
      }
      return true
    },
  },
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
