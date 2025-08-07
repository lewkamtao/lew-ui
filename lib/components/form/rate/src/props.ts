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
    validator: validators.number({
      componentName: 'LewRate',
      propName: 'count',
    }),
  },
  tips: {
    type: [Array, String] as PropType<string[] | string>,
    default: () => [],
    validator: validators.array({
      componentName: 'LewRate',
      propName: 'tips',
    }),
  },
  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRate',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewRate',
      propName: 'disabled',
    }),
  },
}

export type RateProps = ExtractPropTypes<typeof rateProps>
