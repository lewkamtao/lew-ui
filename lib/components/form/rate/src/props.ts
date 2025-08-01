import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes } from 'vue'
import validators from 'lew-ui/validators'

export const rateModel = {
  modelValue: {
    type: Number,
    default: undefined,
    description: '绑定值',
  },
}

export const rateProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '复选框组中复选框的尺寸',
    validator: validators.size({
      componentName: 'LewRate',
      propName: 'size',
    }),
  },
  count: {
    type: Number,
    default: 5,
    description: '评分的总数',
  },
  tips: {
    type: [Array, String] as PropType<string[] | string>,
    default: () => [],
    description: '评分的提示文字,使用逗号分隔每个等级的提示文字,或者使用数组',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用',
  },
}

export type RateProps = ExtractPropTypes<typeof rateProps>
