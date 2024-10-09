import type { ExtractPropTypes } from 'vue'
import { validSizes } from 'lew-ui/constants'
import { LewSize } from 'lew-ui/types'

export type SliderOptions = {
  label: string
  value: string | number
}

export const sliderProps = {
  min: {
    type: [Number, String],
    default: 0,
    description: '最小值',
    validator(value: number | string) {
      if (value && typeof value === 'string' && isNaN(Number(value))) {
        console.warn('[LewInputNumber] min 必须是有效的数字')
        return false
      }
      return true
    }
  },
  max: {
    type: [Number, String],
    default: 100,
    description: '最大值',
    validator(value: number | string) {
      if (value && typeof value === 'string' && isNaN(Number(value))) {
        console.warn('[LewInputNumber] max 必须是有效的数字')
        return false
      }
      return true
    }
  },
  step: {
    type: [Number, String],
    default: 1,
    description: '步长',
    validator(value: number | string) {
      const numValue = Number(value)
      if (isNaN(numValue) || numValue <= 0) {
        console.warn('[LewInputNumber] step 必须是大于 0 的数字')
        return false
      }
      return true
    }
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator(value: LewSize) {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewInputNumber] size 必须是 ${validSizes.join('、')} 之一`
        )
        return false
      }
      return true
    }
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  width: {
    type: [Number, String],
    default: '150px',
    description: '宽度',
    validator(value: number | string) {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewInputNumber] width 必须大于 0')
        return false
      }
      if (typeof value === 'string' && !/^\d+(%|px|em|rem)?$/.test(value)) {
        console.warn('[LewInputNumber] width 必须是有效的 CSS 宽度值')
        return false
      }
      return true
    }
  },
  options: {
    type: Array as PropType<SliderOptions[]>,
    default: () => [],
    description: '步进器配置'
  }
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
