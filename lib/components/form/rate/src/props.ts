import type { LewSize } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const rateModel = {
  modelValue: {
    type: Number,
    default: undefined,
  },
}

export const rateProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewRate',
      propName: 'size',
      values: validSizeList,
    }),
  },
  count: {
    type: Number,
    default: 5,
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
