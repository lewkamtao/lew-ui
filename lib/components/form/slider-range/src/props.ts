import type { Property } from 'csstype'
import type { LewSize, LewSliderRangeOption } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

export const sliderRangeModel = {
  modelValue: {
    type: Array as PropType<number[] | undefined>,
    default: undefined,
  },
}

export const sliderRangeProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewSliderRange',
      propName: 'size',
      values: validSizeList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '100%',
    validator: validators.widthHeight({
      componentName: 'LewDatePicker',
      propName: 'width',
    }),
  },
  min: {
    type: Number,
    default: 0,
    validator: validators.number({
      componentName: 'LewSliderRange',
      propName: 'min',
    }),
  },
  max: {
    type: Number,
    default: 100,
    validator: validators.number({
      componentName: 'LewSliderRange',
      propName: 'max',
    }),
  },
  step: {
    type: Number,
    default: 1,
    validator: validators.number({
      componentName: 'LewSliderRange',
      propName: 'step',
    }),
  },

  readonly: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSliderRange',
      propName: 'readonly',
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewSliderRange',
      propName: 'disabled',
    }),
  },
  options: {
    type: Array as PropType<LewSliderRangeOption[]>,
    default: () => [
      {
        label: '0',
        value: 0,
      },
      {
        label: '100',
        value: 100,
      },
    ],
    validator: validators.array({
      componentName: 'LewSliderRange',
      propName: 'options',
    }),
  },
  formatTooltip: {
    type: Function as PropType<(value: number) => string>,
    default: (value: number) => value.toString(),
    validator: validators.function({
      componentName: 'LewSliderRange',
      propName: 'formatTooltip',
    }),
  },
}

export type SliderRangeProps = ExtractPublicPropTypes<typeof sliderRangeProps>
