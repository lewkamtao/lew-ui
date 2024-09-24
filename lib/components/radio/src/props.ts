import type { ExtractPropTypes, PropType } from 'vue'
import { validSizes } from 'lew-ui/constants'

export type RadioSize = 'small' | 'medium' | 'large'
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
    description: '是否选中'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  iconable: {
    type: Boolean,
    default: true,
    description: '是否显示图标'
  },
  label: {
    type: String,
    default: '',
    description: '单选框文本'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  round: {
    type: Boolean,
    default: true,
    description: '是否为圆角样式'
  },
  size: {
    type: String,
    default: 'medium',
    description: '单选框尺寸',
    validator(value: RadioSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewRadio] 无效的尺寸: ${value}。请使用 ${validSizes.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  block: {
    type: Boolean,
    default: false,
    description: '是否为块级元素'
  }
}

export const radioGroupModel = {
  modelValue: {
    type: [String, Number],
    default: '',
    description: '单选框组绑定值'
  }
}

export const radioGroupProps = {
  block: {
    type: Boolean,
    default: false,
    description: '是否为块级元素'
  },
  direction: {
    type: String,
    default: 'x',
    description: '排列方向',
    validator(value: RadioDirection): boolean {
      const validDirections: RadioDirection[] = ['x', 'y']
      if (!validDirections.includes(value)) {
        console.warn(
          `[LewRadioGroup] 无效的排列方向: ${value}。请使用 ${validDirections.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用所有单选框'
  },
  iconable: {
    type: Boolean,
    default: true,
    description: '是否显示图标'
  },
  options: {
    type: Array as PropType<RadioOptions[]>,
    default: () => [],
    description: '单选框选项数组'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  round: {
    type: Boolean,
    default: true,
    description: '是否为圆角样式'
  },
  size: {
    type: String,
    default: 'medium',
    description: '单选框组尺寸',
    validator(value: RadioSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewRadioGroup] 无效的尺寸: ${value}。请使用 ${validSizes.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  }
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
