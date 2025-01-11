import type { ExtractPropTypes } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'

export const rateModel = {
  modelValue: {
    type: Number,
    default: undefined,
    description: '绑定值'
  }
}

export const rateProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '复选框组中复选框的尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn(
          '[LewRadioGroup] 无效的 size 值，请使用 "small"、"medium" 或 "large"'
        )
        return false
      }
      return true
    }
  } /**
   * 评分的总数
   */,
  count: {
    type: Number,
    default: 5,
    description: '评分的总数'
  },
  /**
   * 是否允许半选
   */
  allowHalf: {
    type: Boolean,
    default: false,
    description: '是否允许半选'
  },
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  }
}

export type RateProps = ExtractPropTypes<typeof rateProps>
